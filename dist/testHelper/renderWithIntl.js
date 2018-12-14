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
    global.renderWithIntl = mod.exports;
  }
})(this, function (exports, _react, _reactTestRenderer, _reactIntl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = renderWithIntl;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function renderWithIntl(element) {
    var instance = void 0;

    (0, _reactTestRenderer.renderIntoDocument)(_react2.default.createElement(
      _reactIntl.IntlProvider,
      null,
      _react2.default.cloneElement(element, {
        ref: function ref(comp) {
          return instance = comp.refs.wrappedInstance;
        }
      })
    ));

    return instance;
  }
});