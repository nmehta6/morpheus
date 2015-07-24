describe('morpheus should', (argument) => {
	let morpheus = require('../index')
	let expect = require('chai').expect

	let from   = 1
	let to     = 2
	console.log('morpheus', morpheus)
	let actual = morpheus.map(from, to)

	expect(to).to.equal(actual)

})
