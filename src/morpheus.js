let {__, always, and, apply, compose, cond, createMapEntry, curry,
	has, isNil, map, mergeAll, not, path, pipe,
	prop, replace, split, toLower, toPairs} = require('ramda')
let validate  = curry(require('jsonschema').validate)
let Registry = require('./registry')
let notNil = compose(not, isNil)

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
		let morph = ([key, s]) => {
			let obj = createMapEntry(key)
			let camelCaseSplit = compose(split(' '), toLower, replace(/([A-Z])/g, ' $1'))

			if (notNil(s.morph)) {
				return obj(s.morph(fromObj))
			}
			else if (s.type === 'object') {
				return obj(this._nestedMapObj(s, fromObj[key]))
			}
			else if (notNil(s.default) && isNil(prop(key, fromObj))) {
				return obj(s.default)
			}
			else if (has(key, fromObj)) {
				return obj(fromObj[key])
			}
			else if (notNil(path(camelCaseSplit(key), fromObj))) {
				return obj(path(camelCaseSplit(key), fromObj))
			}
		}

		let mapObj = pipe(
			toPairs,
			map(morph),
			mergeAll
		)

		if (schema.morph) {
			return schema.morph(fromObj)
		}
		else {
			return mapObj(schema.properties)
		}
	}
	mapObj(id, fromObj) {
		let toSchema = this.getToSchema(id)

		if (toSchema.morph) {
			return toSchema.morph(fromObj)
		}
		else {
			return this._nestedMapObj(toSchema, fromObj)
		}
	}
	mapArray(id, fromArray) {
		let toSchema = this.getToSchema(id)

		if (!!toSchema.morph) {
			return toSchema.morph(fromArray)
		}
		else if (toSchema.items.type === 'object') {
			return fromArray.map(o => this._nestedMapObj(toSchema.items, o))
		}
		else {
			return fromArray
		}
	}
	map(id, fromObj) {
		//first validate fromObj
		this.validate(fromObj, this.getFromSchema(id))

		let result;
		if (this.getFromSchema(id).type === 'array') {
			result = this.mapArray(id, fromObj)
		}
		else {
			result = this.mapObj(id, fromObj)
		}

		//validate toObj
		this.validate(result, this.getToSchema(id))

		return result
	}
}

module.exports = Morpheus
