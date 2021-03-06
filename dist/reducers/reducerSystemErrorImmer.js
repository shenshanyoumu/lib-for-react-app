(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/systemError', '../utils/createReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/systemError'), require('../utils/createReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.systemError, global.createReducer);
    global.reducerSystemErrorImmer = mod.exports;
  }
})(this, function (exports, _systemError, _createReducer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createReducer2 = _interopRequireDefault(_createReducer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _handlers;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var initialState = {
    title: null,
    type: null,
    messages: []
  };

  /* eslint no-param-reassign: "off" */
  var handlers = (_handlers = {}, _defineProperty(_handlers, _systemError.SYSTEM_REPORT_ERROR, function (state, _ref) {
    var _ref$payload = _ref.payload,
        title = _ref$payload.title,
        type = _ref$payload.type,
        messages = _ref$payload.messages;

    state.title = title;
    state.type = type;
    state.messages = messages;
  }), _defineProperty(_handlers, _systemError.SYSTEM_CLEAN_ERROR, function (state) {
    state.title = null;
    state.type = null;
    state.messages = [];
  }), _handlers);
  /* eslint no-param-reassign: "error" */
  exports.default = (0, _createReducer2.default)(initialState, handlers);
});