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
	type: 'string',
	morph: (x) => `Hi, I am ${x.name}. I live at ${x.zip}`
}

describe('morpheus', () => {
	it('should support top level morph', () => {
		let fromObj = {
			name: 'Nach',
			address: 'Palatine, IL',
			zip: '60074'
		}
		morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('person', fromObj)

		expect(actual)
			.to.have.equal('Hi, I am Nach. I live at 60074')
		let isValid = morpheus.validate(actual, toSchema)
		expect(isValid.errors).to.have.length(0)
	})
})
