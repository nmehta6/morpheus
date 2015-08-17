let expect = require('chai').expect
let Morpheus = require('../index')
let morpheus = new Morpheus()
let fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		address: { type: 'string' },
		zip: { type: 'string' }
	}
}
let toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: { type: 'string' }
	}
}

describe('morpheus', () => {
	it('should map schema', () => {
		let fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: '60074'
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('name').equal('Nach')
		let isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
