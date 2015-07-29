var {expect} = require('chai')
var Morpheus = require('../index')
var morpheus = new Morpheus()
var fromSchema = {
	type: 'array',
	items: {
		type: 'number'
	}
}
var toSchema = {
	type: 'array',
	items: {
		type: 'number'
	},
	handler: x => x.map(y => y * 2)
}

describe('morpheus', () => {
	it('should map array', () => {
		var fromArray = [1, 2, 3]
		morpheus.register({id: 'array', 'fromSchema': fromSchema, 'toSchema': toSchema})

		var actual = morpheus.map('array', fromArray)
		var expected = [2, 4, 6]
		expect(actual)
			.to.include.members(expected)
	})
})
