var validate  = require('jsonschema').validate
var {compose, defaultTo, find, identity, map, mergeAll, prop, propEq, toPairs} = require('ramda')
var Registry = require('./registry')

class Morpheus {
	constructor() {
		this.validate = (instance, schema) => validate(instance, schema, {throwError: true})
		this.registry = new Registry()
	}
	register(registration) {
		return this.registry.register(registration)
	}
	map(id, fromObj) {
		var getRegistration = this.registry.find
		var getFromSchema = compose(prop('fromSchema'), getRegistration)
		var getToSchema = compose(prop('toSchema'), getRegistration)
		var getSchemaProps = compose(toPairs, prop('properties'), getToSchema)

		var applyHandler = ([key, schema]) => {
			var value = defaultTo(prop(key))(schema.handler)
			return { [key]: value(fromObj) }
		}

		var mapProps = compose(mergeAll, map(applyHandler))
		var mapObj = compose(mapProps, getSchemaProps)
		var result = mapObj(id)

		//validate against schema
		// this.validate(fromObj, getFromSchema(this.registry.getAll()))
		// this.validate(result, getToSchema(this.registry.getAll()))

		return result
	}
	mapArray(id, fromArray) {
		var getRegistration = find(propEq('id', id))
		var getFromSchema = compose(prop('fromSchema'), getRegistration)
		var getToSchema = compose(prop('toSchema'), getRegistration)

		var applyHandler = (schema) => {
			var value = defaultTo(identity)(schema.handler)
			return value(fromArray)
		}

		var _mapArray = compose(applyHandler, getToSchema)
		var result = _mapArray(this.registry.getAll())

		//validate against schema
		this.validate(fromArray, getFromSchema(this.registry.getAll()))
		this.validate(result, getToSchema(this.registry.getAll()))

		return result
	}
}

module.exports = Morpheus
