var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		zip: { type: 'number' }
	}
}
var toSchema = {
	type: 'object',
	properties: {
		zip: {
			type: 'number',
			handler: x => x.toString()
		}
	}
}

describe('morpheus', (argument) => {
	xit('should map with handler', () => {
		var fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: 60074
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal(60074)
		var isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
