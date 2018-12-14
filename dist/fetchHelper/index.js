(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './consts', './fetchRequest', './fetchResponse', './fetchException'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./consts'), require('./fetchRequest'), require('./fetchResponse'), require('./fetchException'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.consts, global.fetchRequest, global.fetchResponse, global.fetchException);
    global.index = mod.exports;
  }
})(this, function (exports, _consts, _fetchRequest, _fetchResponse, _fetchException) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _consts2 = _interopRequireDefault(_consts);

  var _fetchRequest2 = _interopRequireDefault(_fetchRequest);

  var _fetchResponse2 = _interopRequireDefault(_fetchResponse);

  var _fetchException2 = _interopRequireDefault(_fetchException);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    Consts: _consts2.default,
    FetchRequest: _fetchRequest2.default,
    FetchResponse: _fetchResponse2.default,
    FetchException: _fetchException2.default
  };
});