var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		address: { type: 'string' },
		zip: { type: 'string' }
	}
}
var toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: { type: 'string' }
	}
}

describe('morpheus', () => {
	it('should map schema', () => {
		var fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: '60074'
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('name').equal('Nach')
		var isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
