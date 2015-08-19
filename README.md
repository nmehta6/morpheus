# Morpheus
A simple little library to validate and transform objects. It is inspired by the awesome .NET library [AutoMapper](automapper.org) but built for JavaScript.

[![Build Status](https://travis-ci.org/nmehta6/morpheus.svg)](https://travis-ci.org/nmehta6/morpheus)
![Dependency Status](https://david-dm.org/nmehta6/morpheus.svg)
[![Coverage Status](https://coveralls.io/repos/nmehta6/morpheus/badge.svg?branch=master&service=github)](https://coveralls.io/github/nmehta6/morpheus?branch=master)

![morpheus](http://www.pics4world.com/vb/imgcache/2/4494showing.jpg "morpheus")



## Installation

#### Using Bower
```bash
bower install morpheus --save
```

#### In a browser:
```html
<script src="bower_components/morpheus/dist/morpheus.js"></script>
```

#### Using npm
```bash
npm install morpheus --save
```
#### In Node.js/io.js
```javascript
let Morpheus = require('morpheus')
let morpheus = new Morpheus()
```

## Overview
Morpheus uses JSONSchema to work with objects in a "typed" way. There is a two step process.
1. Register: register all mappings (typically done when your app is bootstrapping). `fromSchema` and `toSchema` are JavaScript objects that comply with the [JSONSchema](http://json-schema.org/) spec.
```javascript
let fromSchema = {
	type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' }
  }
}

	let toSchema = {
		type: 'object',
		properties: {
			address: { type: 'string' }
		}
	}
	let = morpheus = new Morpheus()

	morpheus.register({
		id: 'neo',
		fromSchema: fromSchema,
		toSchema: toSchema
	})
	```
2. Map: Use one of the registered mappings to transform.

	```javascript
	let fromObj = { name: 'Mr. Anderson', address: 'Capital City, USA' }

	let actual = morpheus.map('new', fromObj)
	expect(actual)
		.to.have.property('name').equal('Mr. Anderson')
	let isValid = morpheus.validate(actual, toSchema)
	expect(isValid.errors).to.have.length(0)
	```

## Features
Note: Examples are taken from unit tests located in `./test`

#### Validation with [JSONSchema](http://json-schema.org/)
```javascript
let schema = {
	type: 'number'
}
let instance = 4

let actual = morpheus.validate(instance, schema)
expect(actual.errors).to.have.length(0)
```

#### Map Arrays
```javascript

```

#### Map objects
#### Default values
#### Flattening
#### Projection
