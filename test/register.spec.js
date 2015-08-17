let expect = require('chai').expect
let Morpheus = require('../index')
let morpheus;
let {find,
	propEq} = require('ramda')

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

beforeEach(function() {
	morpheus = new Morpheus()
})

describe('morpheus', () => {
	it('should register schema', () => {
		let registration = {id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema}
		let registrations = morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		expect(find(propEq('id', registration.id))(registrations))
			.to.deep.equals(registration)
	})
})
