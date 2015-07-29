var validate  = require('jsonschema').validate
var {always, cond, compose, defaultTo, identity, map, mergeAll, prop, T, toPairs} = require('ramda')
var Registry = require('./registry')

class Morpheus {
	constructor() {
		this.validate = (instance, schema) => validate(instance, schema, {throwError: true})
		this.registry = new Registry()
		this.getRegistration = this.registry.find
		this.getFromSchema = compose(prop('fromSchema'), this.getRegistration)
		this.getToSchema = compose(prop('toSchema'), this.getRegistration)
	}
	register(registration) {
		return this.registry.register(registration)
	}
	_nestedMapObj(schema, fromObj) {
		var getSchemaProps = compose(toPairs, prop('properties'))

		var applyHandler = ([key, schema]) => {
			if (!!schema.handler) {
				return { [key]: schema.handler(fromObj) }
			}
			else if (!!schema.default) {
				return { [key]: schema.default }
			}
			else if (schema.type === 'object') {
				return { [key]: this._nestedMapObj(schema, fromObj[key]) }
			}
			else {
				return { [key]: fromObj[key] }
			}
		}

		var schemaProps = getSchemaProps(schema)
		var mapObj = compose(mergeAll, map(applyHandler))

		return mapObj(schemaProps)

	}
	_mapObj(id, fromObj) {
		var toSchema = this.getToSchema(id)
		return this._nestedMapObj(toSchema, fromObj)
	}
	_mapArray(id, fromArray) {
		var applyHandler = (schema) => {
			var value = defaultTo(identity)(schema.handler)
			return value(fromArray)
		}

		var _mapArray = compose(applyHandler, this.getToSchema)
		return _mapArray(id)
	}
	map(id, fromObj) {
		var result;
		if (this.getFromSchema(id).type === 'array') {
			result = this._mapArray(id, fromObj)
		}
		else {
			result = this._mapObj(id, fromObj)
		}

		//validate against schema
		this.validate(fromObj, this.getFromSchema(id))
		this.validate(result, this.getToSchema(id))

		return result
	}
}

module.exports = Morpheus
