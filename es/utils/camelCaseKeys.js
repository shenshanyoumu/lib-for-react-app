'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelCaseKeys;

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function camelCaseKeys(object) {
  if ((0, _isArray2.default)(object)) {
    return object.map(function (val) {
      return camelCaseKeys(val);
    });
  } else if ((0, _isObject2.default)(object)) {
    var obj = {};
    Object.keys(object).forEach(function (key) {
      obj[(0, _camelCase2.default)(key)] = camelCaseKeys(object[key]);
    });
    return obj;
  }
  return object;
}