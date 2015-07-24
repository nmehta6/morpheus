let expect = require('chai').expect

describe('morpheus should', (argument) => {
	describe('check schema', () => {
		let morpheus = require('../index')
		let schema = {
			type: 'number'
		}
		let instance = 4

		let actual = morpheus.check(instance, schema)
		expect(actual.errors).to.have.length(0)
	})



})
