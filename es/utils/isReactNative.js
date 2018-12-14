'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactNative;

var _isServerSide = require('./isServerSide');

var _isServerSide2 = _interopRequireDefault(_isServerSide);

var _isBrowserSide = require('./isBrowserSide');

var _isBrowserSide2 = _interopRequireDefault(_isBrowserSide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isReactNative() {
  return !(0, _isServerSide2.default)() && !(0, _isBrowserSide2.default)();
}