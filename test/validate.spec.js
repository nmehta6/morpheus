let expect = require('chai').expect
let Morpheus = require('../index')
let morpheus;

beforeEach(function() {
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
