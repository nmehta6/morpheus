let expect = require('chai').expect
let Morpheus = require('../src/morpheus')
let morpheus = new Morpheus()
let fromSchema = {
	type: 'object',
	properties: {
		tags: { type: 'array' }
	}
}
let toSchema = {
	type: 'object',
	properties: {
		tags: {
			type: 'array',
			morph: x => x.tags.filter(y => y > 1)
		}
	}
}

describe('morpheus', () => {
	it('should map array element', () => {
		let fromObj = {
			tags: [1, 2, 3]
		}
		morpheus.register({id: 'list', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('list', fromObj)
		expect(actual)
			.to.have.property('tags').to.have.length(2)
	})
})
