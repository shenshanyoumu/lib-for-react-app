'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlers;

var _immutable = require('immutable');

var _systemError = require('../actions/systemError');

var _createReducer = require('../utils/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({
  title: null,
  type: null,
  messages: []
});

var handlers = (_handlers = {}, _defineProperty(_handlers, _systemError.SYSTEM_REPORT_ERROR, function (state, _ref) {
  var payload = _ref.payload;
  var title = payload.title,
      type = payload.type,
      messages = payload.messages;


  return state.withMutations(function (s) {
    s.set('title', title);
    s.set('type', type);
    s.set('messages', messages);
  });
}), _defineProperty(_handlers, _systemError.SYSTEM_CLEAN_ERROR, function (state) {
  return state.withMutations(function (s) {
    s.set('title', null);
    s.set('type', null);
    s.set('messages', []);
  });
}), _handlers);

exports.default = (0, _createReducer2.default)(initialState, handlers);