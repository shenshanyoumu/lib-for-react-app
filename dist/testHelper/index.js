(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './createComponentWithIntl', './renderWithIntl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./createComponentWithIntl'), require('./renderWithIntl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.createComponentWithIntl, global.renderWithIntl);
    global.index = mod.exports;
  }
})(this, function (exports, _createComponentWithIntl, _renderWithIntl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createComponentWithIntl2 = _interopRequireDefault(_createComponentWithIntl);

  var _renderWithIntl2 = _interopRequireDefault(_renderWithIntl);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    createComponentWithIntl: _createComponentWithIntl2.default,
    renderWithIntl: _renderWithIntl2.default
  };
});