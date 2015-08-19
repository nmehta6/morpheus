let expect = require('chai').expect
let morpheus

beforeEach(function() {
	//we have a global in the browser
	morpheus = new Morpheus()
})

describe('canary test', function() {
	it('should pass', () => {
		expect(true).to.equal(true)
	})
})
