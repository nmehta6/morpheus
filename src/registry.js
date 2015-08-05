var {append, find, propEq} = require('ramda')

class Registry {
	constructor() {
		this.registrations = []
		this.find = (id) => find(propEq('id', id), this.registrations)
		this.register = (registration) => this.registrations = append(registration, this.registrations)
	}
}

module.exports = Registry
