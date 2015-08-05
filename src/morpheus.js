var R = require('ramda')
var {__, compose, createMapEntry, curry, has, map, mergeAll, path, pipe, prop, replace, split, toLower, toPairs} = require('ramda')
var validate  = curry(require('jsonschema').validate)
var Registry = require('./registry')
var notNil = compose(R.not, R.isNil)

class Morpheus {
	constructor() {
		this.registry = new Registry()
		this.validate = validate(__, __, {throwError: true})
		this.getRegistration = this.registry.find
		this.getFromSchema = compose(prop('fromSchema'), this.getRegistration)
		this.getToSchema = compose(prop('toSchema'), this.getRegistration)
		this.register = this.registry.register
	}
	_nestedMapObj(schema, fromObj) {
		var morph = ([key, s]) => {
			let obj = createMapEntry(key)
			let camelCaseSplit = compose(split(' '), toLower, replace(/([A-Z])/g, ' $1'))

			if (notNil(s.morph)) {
				return obj(s.morph(fromObj))
			}
			else if (notNil(s.default)) {
				return obj(s.default)
			}
			else if (s.type === 'object') {
				return obj(this._nestedMapObj(s, fromObj[key]))
			}
			else if (has(key, fromObj)) {
				return obj(fromObj[key])
			}
			else if (notNil(path(camelCaseSplit(key), fromObj))) {
				return obj(path(camelCaseSplit(key), fromObj))
			}
		}

		var mapObj = pipe(
			toPairs,
			map(morph),
			mergeAll
		)

		return mapObj(schema.properties)
	}
	_mapObj(id, fromObj) {
		var toSchema = this.getToSchema(id)

		if (toSchema.morph) {
			return toSchema.morph(fromObj)
		}
		else {
			return this._nestedMapObj(toSchema, fromObj)
		}
	}
	_nestedMapArray(schema, fromArray) {
		if (!!schema.morph) {
			return schema.morph(fromArray)
		}
		else if (schema.items.type === 'object') {
			return fromArray.map(o => this._nestedMapObj(schema.items, o))
		}
		else {
			return fromArray
		}
	}
	_mapArray(id, fromArray) {
		var toSchema = this.getToSchema(id)

		if (!!toSchema.morph) {
			return toSchema.morph(fromArray)
		}
		else {
			return this._nestedMapArray(toSchema, fromArray)
		}
	}
	map(id, fromObj) {
		var result;
		if (this.getFromSchema(id).type === 'array') {
			result = this._mapArray(id, fromObj)
		}
		else {
			result = this._mapObj(id, fromObj)
		}

		//validate against schema
		this.validate(fromObj, this.getFromSchema(id))
		this.validate(result, this.getToSchema(id))

		return result
	}
}

module.exports = Morpheus
