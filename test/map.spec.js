var expect = require('chai').expect
var morpheus = require('../index')

describe('morpheus', (argument) => {
	it('should map schema', () => {
		var fromSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				address: { type: 'string' },
				zip: { type: 'number' }
			}
		}
		var toSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				zip: { type: 'string' }
			}
		}
		var fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: 60074
		}

		var actual = morpheus.map(fromSchema, toSchema, fromObj)
		expect(actual)
			.to.have.property('name').equal('Nach')
		var isValid = morpheus.validate(actual, toSchema)
		// console.log('errors', isValid.errors);
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
