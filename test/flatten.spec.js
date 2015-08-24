let expect = require('chai').expect
let Morpheus = require('../src/morpheus')
let morpheus = new Morpheus()
let fromSchema = {
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
let toSchema = {
	type: 'object',
	properties: {
		addressZip: {
			type: 'string'
		}
	}
}

describe('morpheus', () => {
	it('should get flattended value', () => {
		let fromObj = {
			address: {
				zip: '60074'
			}
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('addressZip').equal('60074')
	})
})
