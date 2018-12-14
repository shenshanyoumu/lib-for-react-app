(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './systemError', './systemLoading'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./systemError'), require('./systemLoading'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.systemError, global.systemLoading);
    global.index = mod.exports;
  }
})(this, function (exports, _systemError, _systemLoading) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    systemReportError: _systemError.systemReportError,
    systemCleanError: _systemError.systemCleanError,
    systemShowLoading: _systemLoading.systemShowLoading,
    systemHideLoading: _systemLoading.systemHideLoading
  };
});