let {expect} = require('chai')
let Morpheus = require('../src/morpheus')
let morpheus = new Morpheus()
let fromSchema = {
	type: 'array',
	items: {
		type: 'number'
	}
}
let toSchema = {
	type: 'array',
	items: {
		type: 'number'
	},
	morph: x => x.map(y => y * 2)
}

describe('morpheus', () => {
	it('should map array', () => {
		let fromArray = [1, 2, 3]
		morpheus.register({id: 'array', 'fromSchema': fromSchema, 'toSchema': toSchema})

		let actual = morpheus.map('array', fromArray)
		let expected = [2, 4, 6]
		expect(actual)
			.to.include.members(expected)
	})
})
