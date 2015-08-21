let expect = require('chai').expect
let Morpheus = require('../index')
let morpheus = new Morpheus()
let fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: {
			type: ['string', 'null']
		}
	}
}
let toSchema = {
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
		let fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: null
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal('60075')
	})

	it('should not default value', () => {
		let fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: '60077'
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal('60077')
	})
})
