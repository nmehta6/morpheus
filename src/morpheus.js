var validate  = require('jsonschema').validate
var {__, compose, defaultTo, find, ifElse, keys, map, mergeAll, pick, pickBy, prop, propEq, toPairs} = require('ramda')

class Morpheus {
	constructor() {
		this.validate = validate
		this.registrations = []
	}
	register(registration) {
		this.registrations.push(registration)
		return this.registrations
	}
	map(id, fromObj) {
		var getSchemaProps = compose(toPairs, prop('properties'), prop('toSchema'), find(propEq('id', id)))
		var applyHandler = ([key, schema]) => {
			var value = defaultTo(prop(key))(schema.handler)
			return { [key]: value(fromObj)}
		}
		var mapProps = compose(mergeAll, map(applyHandler))

		var mapObj = compose(mapProps, getSchemaProps)
		var result = mapObj(this.registrations)

		return result
	}
}

module.exports = Morpheus
