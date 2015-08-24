'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('ramda');

var __ = _require.__;
var always = _require.always;
var and = _require.and;
var apply = _require.apply;
var compose = _require.compose;
var cond = _require.cond;
var createMapEntry = _require.createMapEntry;
var curry = _require.curry;
var has = _require.has;
var isNil = _require.isNil;
var map = _require.map;
var mergeAll = _require.mergeAll;
var not = _require.not;
var path = _require.path;
var pipe = _require.pipe;
var prop = _require.prop;
var replace = _require.replace;
var split = _require.split;
var toLower = _require.toLower;
var toPairs = _require.toPairs;

var validate = curry(require('jsonschema').validate);
var Registry = require('./registry');
var notNil = compose(not, isNil);

var Morpheus = (function () {
	function Morpheus() {
		_classCallCheck(this, Morpheus);

		this.registry = new Registry();
		this.validate = validate(__, __, { throwError: true });
		this.getRegistration = this.registry.find;
		this.getFromSchema = compose(prop('fromSchema'), this.getRegistration);
		this.getToSchema = compose(prop('toSchema'), this.getRegistration);
		this.register = this.registry.register;
	}

	_createClass(Morpheus, [{
		key: '_nestedMapObj',
		value: function _nestedMapObj(schema, fromObj) {
			var _this = this;

			var morph = function morph(_ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var key = _ref2[0];
				var s = _ref2[1];

				var obj = createMapEntry(key);
				var camelCaseSplit = compose(split(' '), toLower, replace(/([A-Z])/g, ' $1'));

				if (notNil(s.morph)) {
					return obj(s.morph(fromObj));
				} else if (s.type === 'object') {
					return obj(_this._nestedMapObj(s, fromObj[key]));
				} else if (notNil(s['default']) && isNil(prop(key, fromObj))) {
					return obj(s['default']);
				} else if (has(key, fromObj)) {
					return obj(fromObj[key]);
				} else if (notNil(path(camelCaseSplit(key), fromObj))) {
					return obj(path(camelCaseSplit(key), fromObj));
				}
			};

			var mapObj = pipe(toPairs, map(morph), mergeAll);

			if (schema.morph) {
				return schema.morph(fromObj);
			} else {
				return mapObj(schema.properties);
			}
		}
	}, {
		key: 'mapObj',
		value: function mapObj(id, fromObj) {
			var toSchema = this.getToSchema(id);

			if (toSchema.morph) {
				return toSchema.morph(fromObj);
			} else {
				return this._nestedMapObj(toSchema, fromObj);
			}
		}
	}, {
		key: 'mapArray',
		value: function mapArray(id, fromArray) {
			var _this2 = this;

			var toSchema = this.getToSchema(id);

			if (!!toSchema.morph) {
				return toSchema.morph(fromArray);
			} else if (toSchema.items.type === 'object') {
				return fromArray.map(function (o) {
					return _this2._nestedMapObj(toSchema.items, o);
				});
			} else {
				return fromArray;
			}
		}
	}, {
		key: 'map',
		value: function map(id, fromObj) {
			//first validate fromObj
			this.validate(fromObj, this.getFromSchema(id));

			var result = undefined;
			if (this.getFromSchema(id).type === 'array') {
				result = this.mapArray(id, fromObj);
			} else {
				result = this.mapObj(id, fromObj);
			}

			//validate toObj
			this.validate(result, this.getToSchema(id));

			return result;
		}
	}]);

	return Morpheus;
})();

module.exports = Morpheus;