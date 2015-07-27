var expect = require('chai').expect
var Morpheus = require('../index')
var morpheus;
var {contains,
	find,
	propEq} = require('ramda')

var fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		address: { type: 'string' },
		zip: { type: 'string' }
	}
}
var toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: { type: 'string' }
	}
}

beforeEach(function() {
	morpheus = new Morpheus()
})

describe('morpheus', (argument) => {
	it('should register schema', () => {
		var registration = {id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema}
		var registrations = morpheus.register({id: 'person', 'fromSchema': fromSchema, 'toSchema': toSchema})

		expect(find(propEq('id', registration.id))(registrations))
			.to.deep.equals(registration)
	})
})
