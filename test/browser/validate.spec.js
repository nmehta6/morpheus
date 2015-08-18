var expect = chai.expect
var morpheus

beforeEach(function() {
	morpheus = new Morpheus()
})

describe('morpheus', function() {
	it('should validate schema', function() {
		var schema = {
			type: 'number'
		}
		var instance = 4

		var actual = morpheus.validate(instance, schema)
		expect(actual.errors).to.have.length(0)
	})
})
