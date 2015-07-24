let validate = require('jsonschema').validate
class Morpheus {
	constructor() {
		this.check = validate
	}
	map(fromSchema, to) {
		return to;
	}
}

module.exports = new Morpheus()
