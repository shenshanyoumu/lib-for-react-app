(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './isServerSide', './isBrowserSide'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./isServerSide'), require('./isBrowserSide'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isServerSide, global.isBrowserSide);
    global.isReactNative = mod.exports;
  }
})(this, function (exports, _isServerSide, _isBrowserSide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isReactNative;

  var _isServerSide2 = _interopRequireDefault(_isServerSide);

  var _isBrowserSide2 = _interopRequireDefault(_isBrowserSide);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function isReactNative() {
    return !(0, _isServerSide2.default)() && !(0, _isBrowserSide2.default)();
  }
});