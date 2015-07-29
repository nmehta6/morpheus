var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: {
			type: ['string', 'null']
		}
	}
}
var toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: {
			type: 'string',
			'default': '60075'
		}
	}
}

describe('morpheus', () => {
	it('should default value', () => {
		var fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: null
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal('60075')
	})
})
