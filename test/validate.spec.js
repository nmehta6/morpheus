var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus;

beforeEach(function() {
	morpheus = new Morpheus()
})

describe('morpheus', () => {
	it('should validate schema', () => {
		var schema = {
			type: 'number'
		}
		var instance = 4

		var actual = morpheus.validate(instance, schema)
		expect(actual.errors).to.have.length(0)
	})
})
