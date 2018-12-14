'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createComponentWithIntl = function createComponentWithIntl(children) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { locale: 'en' };

  return _reactTestRenderer2.default.create(_react2.default.createElement(
    _reactIntl.IntlProvider,
    props,
    children
  ));
};

exports.default = createComponentWithIntl;