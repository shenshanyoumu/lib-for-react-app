(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-intl', 'hoist-non-react-statics'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-intl'), require('hoist-non-react-statics'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactIntl, global.hoistNonReactStatics);
    global.withInjectIntl = mod.exports;
  }
})(this, function (exports, _react, _reactIntl, _hoistNonReactStatics) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = withInjectIntl;

  var _react2 = _interopRequireDefault(_react);

  var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function withInjectIntl(WrappedComponent, options) {
    var Component = (0, _reactIntl.injectIntl)(WrappedComponent, options);

    // react-intl的injectIntl高阶组件会丢失Component中的所有静态方法
    // 封装一层withInjectIntl，用来拷贝静态方法
    (0, _hoistNonReactStatics2.default)(Component, WrappedComponent);

    return Component;
  }
});