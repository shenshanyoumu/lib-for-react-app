(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.processHeaders = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaultHeaderProps = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  };

  /** 解析response的headers信息
   * @param headers
   * @returns {*}
   */

  exports.default = function (headers) {
    var finalheaders = _extends({}, defaultHeaderProps, headers);

    Object.keys(finalheaders).forEach(function (key) {
      if (_typeof(finalheaders[key]) === 'object') {
        finalheaders[key] = JSON.stringify(finalheaders[key]);
      }
    });

    return finalheaders;
  };
});