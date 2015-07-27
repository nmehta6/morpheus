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
		var mapProps = compose(pick(__, fromObj), keys, getSchemaProps)
		var result = mapProps(this.registrations)
		
		return result
	}
}

module.exports = Morpheus
