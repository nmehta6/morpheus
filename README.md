# Morpheus
A simple little library to validate and transform objects. It is inspired by the awesome .NET library [AutoMapper](automapper.org) but built for JavaScript.

<i>Note: This is an experimental package. Please [file an issue](https://github.com/nmehta6/morpheus/issues) if you find one.</i>

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
npm install @nmehta6/morpheus --save
```
#### In Node.js/io.js
```javascript
let Morpheus = require('morpheus')
let morpheus = new Morpheus()
```

## Overview
Morpheus uses JSONSchema to work with objects in a "typed" way. There is a two step process.

1. Register: register all mappings (typically done when your app is bootstrapping). `fromSchema` and `toSchema` are JavaScript objects that comply with the [JSONSchema](http://json-schema.org/) spec.
2. Use one of the registered mappings to transform.

Register example:
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

Map example:
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
Validation is enforced on both `fromObj` and `toObj` using the `fromSchema` and `toSchema`. If you are calling an external service and if the service changes the data model, you can get a validation error early. It also makes writing unit tests easier for the mapping logic.
```javascript
let schema = {
	type: 'number'
}
let instance = 4

let actual = morpheus.validate(instance, schema)
expect(actual.errors).to.have.length(0)
```

#### Map Arrays
Mapping arrays and transforming them
```javascript
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
let fromArray = [1, 2, 3]
let actual = morpheus.map('array', fromArray)
//actual is now [2,4,6]
```

#### Map objects
Mapping objects with desired properties
```javascript
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
```

#### Default values
Default value for the `zip` property
```javascript
let fromSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: {
			type: ['string', 'null']
		}
	}
}
let toSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		zip: {
			type: 'string',
			'default': '60075'
		}
	}
}
```
#### Flattening
Flatten an object using the camelCase property naming convention for the `addressZip` property.
```javascript
let fromSchema = {
	type: 'object',
	properties: {
		address: {
			type: 'object',
			properties: {
				zip: {
					type: ['string']
				}
			}
		}
	}
}
let toSchema = {
	type: 'object',
	properties: {
		addressZip: {
			type: 'string'
		}
	}
}
```
#### Projection
Project over properties of an object and create new properties
```javascript
let fromSchema = {
	type: 'object',
	properties: {
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		},
		zip: {
			type: 'number'
		}
	}
}
let toSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			morph: x => `${x.firstName} ${x.lastName}`
		},
		zip: {
			type: 'string',
			morph: x => x.zip.toString()
		}
	}
}
```
