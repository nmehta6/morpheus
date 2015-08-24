let expect = require('chai').expect
let Morpheus = require('../src/morpheus')
let morpheus = new Morpheus()

let fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		address: {
			type: 'object',
			properties: {
				lines: {
					type: 'array',
					items: { type: 'string' }
				},
				zip: { type: 'string' },
				city: { type: 'string' },
				country: { type: 'string' }
			},
			required: ['country']
		},
		votes: {'type': 'integer', 'minimum': 1}
	}
}

let toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		address: {
			type: 'object',
			properties: {
				city: { type: 'string' }
			}
		},
		votes: { type: 'integer' }
	}
}

describe('morpheus', () => {
	it('should map nested objects', () => {
		let fromObj = {
			name: 'Barack Obama',
			address: {
				lines: [ '1600 Pennsylvania Avenue Northwest' ],
				zip: 'DC 20500',
				city: 'Washington',
				country: 'USA'
			},
			votes: 500
		}

		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)

		// console.log(actual, actual)

		let expected = {
			name: 'Barack Obama',
			address: {
				city: 'Washington'
			},
			votes: 500
		}

		expect(actual)
			.to.deep.equal(expected)
	})
})
