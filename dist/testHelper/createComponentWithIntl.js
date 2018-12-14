(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-test-renderer', 'react-intl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-test-renderer'), require('react-intl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactTestRenderer, global.reactIntl);
    global.createComponentWithIntl = mod.exports;
  }
})(this, function (exports, _react, _reactTestRenderer, _reactIntl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var createComponentWithIntl = function createComponentWithIntl(children) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { locale: 'en' };

    return _reactTestRenderer2.default.create(_react2.default.createElement(
      _reactIntl.IntlProvider,
      props,
      children
    ));
  };

  exports.default = createComponentWithIntl;
});