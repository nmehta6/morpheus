'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('ramda');

var append = _require.append;
var find = _require.find;
var propEq = _require.propEq;

var Registry = function Registry() {
	var _this = this;

	_classCallCheck(this, Registry);

	this.registrations = [];
	this.find = function (id) {
		return find(propEq('id', id), _this.registrations);
	};
	this.register = function (registration) {
		return _this.registrations = append(registration, _this.registrations);
	};
};

module.exports = Registry;