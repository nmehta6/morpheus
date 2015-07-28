var validate  = require('jsonschema').validate
var {compose, defaultTo, find, identity, map, mergeAll, prop, propEq, toPairs} = require('ramda')

class Registry {
	constructor() {
		this.registrations = []
	}
	register(registration) {
		this.registrations.push(registration)
		return this.registrations
	}
	getAll() {
		return this.registrations
	}
}

module.exports = Registry
