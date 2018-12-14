(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './consts/exceptionTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./consts/exceptionTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.exceptionTypes);
    global.fetchException = mod.exports;
  }
})(this, function (exports, _exceptionTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ExceptionTypes = _interopRequireWildcard(_exceptionTypes);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FetchException = function FetchException(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ExceptionTypes.HTTP;
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, FetchException);

    this.name = 'Fetch_Exception';
    this.message = message;
    this.type = type;
    this.data = data;
  };

  exports.default = FetchException;
});