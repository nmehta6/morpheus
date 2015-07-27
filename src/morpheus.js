var validate  = require('jsonschema').validate
var {__, compose, find, keys, map, pick, pickBy, prop, propEq, toPairs} = require('ramda')

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
		var getSchemaProps = compose(prop('properties'), prop('toSchema'), find(propEq('id', id)))
		var mapProps = compose(pick(__, fromObj), keys)

		var mapObj = compose(mapProps, getSchemaProps)
		var result = mapObj(this.registrations)

		return result
	}
}

module.exports = Morpheus
