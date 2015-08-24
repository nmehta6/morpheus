let {append, find, propEq} = require('ramda')

export default class Registry {
	constructor() {
		this.registrations = []
		this.find = (id) => find(propEq('id', id), this.registrations)
		this.register = (registration) => this.registrations = append(registration, this.registrations)
	}
}
