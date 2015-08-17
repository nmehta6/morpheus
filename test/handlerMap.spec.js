let expect = require('chai').expect
let Morpheus = require('../index')
let morpheus = new Morpheus()
let fromSchema = {
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
let toSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			morph: x => `${x.firstName} ${x.lastName}`
		},
		zip: {
			type: 'string',
			morph: x => x.zip.toString()
		}
	}
}

describe('morpheus', () => {
	it('should map with morph', () => {
		let fromObj = {
			firstName: 'Nach',
			lastName: 'Mehta',
			zip: 60074
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)
		expect(actual)
			.to.have.property('zip').equal('60074')
		expect(actual)
			.to.have.property('name').equal('Nach Mehta')
		let isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)

		expect()
	})
})
