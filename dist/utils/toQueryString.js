(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isArray', 'lodash/isObject'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isArray'), require('lodash/isObject'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isArray, global.isObject);
    global.toQueryString = mod.exports;
  }
})(this, function (exports, _isArray, _isObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
});