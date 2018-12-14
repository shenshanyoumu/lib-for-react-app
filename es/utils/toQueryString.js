'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* support params schema
const data = {
  key1: 'string',
  key2: [1, 2, 3],
  key3: 1
};
*/

exports.default = function (object, isDuplicateKey) {
  if (!(0, _isObject2.default)(object)) {
    return object;
  }

  var ret = Object.keys(object).map(function (key) {
    var value = object[key];

    if ((0, _isArray2.default)(value)) {
      if (isDuplicateKey) {
        return value.map(function (v) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(v));
        }).join('&');
      }

      value = value.map(function (v) {
        return JSON.stringify(v);
      }).join(',');
    }

    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  });

  return ret.join('&');
};