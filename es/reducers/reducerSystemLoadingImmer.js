'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlers;

var _systemLoading = require('../actions/systemLoading');

var _createReducer = require('../utils/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  display: false,
  text: ''
};
/* eslint no-param-reassign: "off" */
var handlers = (_handlers = {}, _defineProperty(_handlers, _systemLoading.SYSTEM_SHOW_LOADING, function (state, _ref) {
  var _ref$payload = _ref.payload;
  _ref$payload = _ref$payload === undefined ? {} : _ref$payload;
  var _ref$payload$text = _ref$payload.text,
      text = _ref$payload$text === undefined ? '' : _ref$payload$text;

  state.display = true;
  state.text = text;
}), _defineProperty(_handlers, _systemLoading.SYSTEM_HIDE_LOADING, function (state) {
  state.display = false;
  state.text = '';
}), _handlers);
/* eslint no-param-reassign: "error" */
exports.default = (0, _createReducer2.default)(initialState, handlers);