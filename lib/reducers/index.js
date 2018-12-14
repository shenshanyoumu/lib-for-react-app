'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducerSystemError = require('./reducerSystemError');

var _reducerSystemError2 = _interopRequireDefault(_reducerSystemError);

var _reducerSystemLoading = require('./reducerSystemLoading');

var _reducerSystemLoading2 = _interopRequireDefault(_reducerSystemLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  systemError: _reducerSystemError2.default,
  systemLoading: _reducerSystemLoading2.default
};