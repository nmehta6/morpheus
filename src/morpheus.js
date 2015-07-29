var validate  = require('jsonschema').validate
var {compose, defaultTo, find, identity, ifElse, map, mergeAll, prop, propEq, toPairs} = require('ramda')
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
	_mapObj(id, fromObj) {
		var getSchemaProps = compose(toPairs, prop('properties'), this.getToSchema)

		var applyHandler = ([key, schema]) => {
			var value = defaultTo(prop(key))(schema.handler)
			return { [key]: value(fromObj) }
		}

		var mapProps = compose(mergeAll, map(applyHandler))
		var mapObj = compose(mapProps, getSchemaProps)
		return mapObj(id)
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
		if (this.getFromSchema(id).type === 'array') {
			var result = this._mapArray(id, fromObj)
		}
		else {
			var result = this._mapObj(id, fromObj)
		}

		//validate against schema
		this.validate(fromObj, this.getFromSchema(id))
		this.validate(result, this.getToSchema(id))

		return result
	}
}

module.exports = Morpheus
