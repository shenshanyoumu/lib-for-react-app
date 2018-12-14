(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './exceptionTypes', './httpMethods', './responseCodes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./exceptionTypes'), require('./httpMethods'), require('./responseCodes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.exceptionTypes, global.httpMethods, global.responseCodes);
    global.index = mod.exports;
  }
})(this, function (exports, _exceptionTypes, _httpMethods, _responseCodes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ExceptionTypes = _interopRequireWildcard(_exceptionTypes);

  var HttpMethods = _interopRequireWildcard(_httpMethods);

  var ResponseCodes = _interopRequireWildcard(_responseCodes);

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

  exports.default = {
    HttpMethods: HttpMethods,
    ResponseCodes: ResponseCodes,
    ExceptionTypes: ExceptionTypes
  };
});