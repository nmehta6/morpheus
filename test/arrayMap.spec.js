var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'object',
	properties: {
		tags: { type: 'array' }
	}
}
var toSchema = {
	type: 'object',
	properties: {
		tags: {
			type: 'array',
			handler: x => x.tags.filter(y => y > 1)
		}
	}
}

describe('morpheus', () => {
	it('should map array', () => {
		var fromObj = {
			tags: [1, 2, 3]
		}
		morpheus.register({id: 'list', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('list', fromObj)
		expect(actual)
			.to.have.property('tags').to.have.length(2)
	})
})
