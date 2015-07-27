var validate  = require('jsonschema').validate
var {__, compose, keys, map, pick, pickBy, toPairs} = require('ramda')

class Morpheus {
	constructor() {
		this.validate = validate
	}
	map(fromSchema, toSchema, fromObj) {
		// var convertProps = (value) =

		var mapProps = compose(pick(__, fromObj), keys)

		var result = mapProps(toSchema.properties)

		for (var prop in toSchema.properties) {
			if (toSchema.properties[prop].type !== fromSchema.properties[prop].type) {
				if (toSchema.properties[prop].type === 'string') {
					result[prop] = result[prop].toString()
				}
			}
		}

		return result
	}
}

module.exports = new Morpheus()
