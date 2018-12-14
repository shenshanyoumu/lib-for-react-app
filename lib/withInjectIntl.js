'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withInjectIntl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withInjectIntl(WrappedComponent, options) {
  var Component = (0, _reactIntl.injectIntl)(WrappedComponent, options);

  // react-intl的injectIntl高阶组件会丢失Component中的所有静态方法
  // 封装一层withInjectIntl，用来拷贝静态方法
  (0, _hoistNonReactStatics2.default)(Component, WrappedComponent);

  return Component;
}