let validate  = require('jsonschema').validate
let {compose, keys} = require('ramda')

class Morpheus {
	constructor() {
		this.check = validate
	}
	map(fromSchema, toSchema, fromObj) {


		let toObj = {}
		for (var prop in toSchema.properties) {
			if (fromObj.hasOwnProperty(prop)) {
				toObj[prop] = fromObj[prop]
			}
		}

		return toObj




	}
}

module.exports = new Morpheus()
