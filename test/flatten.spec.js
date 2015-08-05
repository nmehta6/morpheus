var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		address: {
			type: 'object',
			properties: {
				zip: {
					type: ['string']
				}
			}
		}
	}
}
var toSchema = {
	type: 'object',
	properties: {
		addressZip: {
			type: 'string'
		}
	}
}

describe('morpheus', () => {
	it('should get flattended value', () => {
		var fromObj = {
			address: {
				zip: '60074'
			}
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('addressZip').equal('60074')
	})
})
