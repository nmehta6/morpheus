var expect = require('chai').expect
var morpheus = require('../index')

describe('morpheus', (argument) => {
	it('should validate schema', () => {
		var schema = {
			type: 'number'
		}
		var instance = 4

		var actual = morpheus.validate(instance, schema)
		expect(actual.errors).to.have.length(0)
	})
})
