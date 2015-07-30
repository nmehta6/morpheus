var {expect} = require('chai')
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			address: {
				type: 'object',
				properties: {
					zip: { type: 'string' },
					city: { type: 'string' },
					country: { type: 'string' }
				}
			}
		}
	}
}

var toSchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			address: {
				type: 'object',
				properties: {
					zip: { type: 'string' }
				}
			}
		}
	}
}

describe('morpheus', () => {
	it('should map objects in array', () => {
		var fromArray = [
			{
				name: 'Barack Obama',
				address: {
					zip: 'DC 20500',
					city: 'Washington',
					country: 'USA'
				}
			},
			{
				name: 'Michelle Obama',
				address: {
					zip: '60660',
					city: 'Chicago',
					country: 'USA'
				}
			}
		]

		var expected = [
			{
				name: 'Barack Obama',
				address: {
					zip: 'DC 20500'
				}
			},
			{
				name: 'Michelle Obama',
				address: {
					zip: '60660'
				}
			}
		]
		morpheus.register({id: 'array', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('array', fromArray)
		expect(actual)
			.to.deep.equal(expected)
	})
})
