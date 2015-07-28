var validate  = require('jsonschema').validate
var {__, append, compose, defaultTo, find, identity, map, mergeAll, prop, propEq, toPairs} = require('ramda')

class Registry {
	constructor() {
		this.registrations = []
		this.find = (id) => find(propEq('id', id), this.registrations)
		this.register = (registration) => this.registrations = append(registration, this.registrations)
	}
	getAll() {
		return this.registrations
	}
}

module.exports = Registry
