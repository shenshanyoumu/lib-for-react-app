'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderWithIntl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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