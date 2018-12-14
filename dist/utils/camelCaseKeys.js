(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isArray', 'lodash/isObject', 'lodash/camelCase'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isArray'), require('lodash/isObject'), require('lodash/camelCase'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isArray, global.isObject, global.camelCase);
    global.camelCaseKeys = mod.exports;
  }
})(this, function (exports, _isArray, _isObject, _camelCase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = camelCaseKeys;

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _camelCase2 = _interopRequireDefault(_camelCase);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
});