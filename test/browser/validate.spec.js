let expect = require('chai').expect
var morpheus

beforeEach(function() {
	//we have a global in the browser
	morpheus = new Morpheus()
})

describe('morpheus', () => {
	it('should validate schema', () => {
		let schema = {
			type: 'number'
		}
		let instance = 4

		let actual = morpheus.validate(instance, schema)
		expect(actual.errors).to.have.length(0)
	})
})
