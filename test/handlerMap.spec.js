var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		},
		zip: {
			type: 'number'
		}
	}
}
var toSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			handler: x => `${x.firstName} ${x.lastName}`
		},
		zip: {
			type: 'string',
			handler: x => x.zip.toString()
		}
	}
}

describe('morpheus', () => {
	it('should map with handler', () => {
		var fromObj = {
			firstName: 'Nach',
			lastName: 'Mehta',
			zip: 60074
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal('60074')
		expect(actual)
			.to.have.property('name').equal('Nach Mehta')
		var isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
