let expect = require('chai').expect
let morpheus = require('../index')

describe('morpheus', (argument) => {
	it('should validate schema', () => {
		let schema = {
			type: 'number'
		}
		let instance = 4

		let actual = morpheus.check(instance, schema)
		expect(actual.errors).to.have.length(0)
	})
	it('should map schema', () => {
		let fromSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				address: { type: 'string' },
				zip: { type: 'number' }
			}
		}
		let toSchema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				zip: { type: 'string' }
			}
		}
		let fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: 60074
		}

		let actual = morpheus.map(fromSchema, toSchema, fromObj)
		expect(actual)
			.to.have.property('name').equal('Nach')
	})
})
