var validate  = require('jsonschema').validate
var {compose, defaultTo, find, identity, map, mergeAll, prop, propEq, toPairs} = require('ramda')

class Morpheus {
	constructor() {
		this.validate = (instance, schema) => validate(instance, schema, {throwError: true})
		this.registrations = []
	}
	register(registration) {
		this.registrations.push(registration)
		return this.registrations
	}
	map(id, fromObj) {
		var getRegistration = find(propEq('id', id))
		var getFromSchema = compose(prop('fromSchema'), getRegistration)
		var getToSchema = compose(prop('toSchema'), getRegistration)
		var getSchemaProps = compose(toPairs, prop('properties'), getToSchema)

		var applyHandler = ([key, schema]) => {
			var value = defaultTo(prop(key))(schema.handler)
			return { [key]: value(fromObj) }
		}

		var mapProps = compose(mergeAll, map(applyHandler))
		var mapObj = compose(mapProps, getSchemaProps)
		var result = mapObj(this.registrations)

		//validate against schema
		this.validate(fromObj, getFromSchema(this.registrations))
		this.validate(result, getToSchema(this.registrations))

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
		var result = _mapArray(this.registrations)

		//validate against schema
		this.validate(fromArray, getFromSchema(this.registrations))
		this.validate(result, getToSchema(this.registrations))

		return result
	}
}

module.exports = Morpheus
