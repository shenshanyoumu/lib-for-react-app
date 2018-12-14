(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './reducerSystemError', './reducerSystemLoading'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./reducerSystemError'), require('./reducerSystemLoading'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reducerSystemError, global.reducerSystemLoading);
    global.index = mod.exports;
  }
})(this, function (exports, _reducerSystemError, _reducerSystemLoading) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reducerSystemError2 = _interopRequireDefault(_reducerSystemError);

  var _reducerSystemLoading2 = _interopRequireDefault(_reducerSystemLoading);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    systemError: _reducerSystemError2.default,
    systemLoading: _reducerSystemLoading2.default
  };
});