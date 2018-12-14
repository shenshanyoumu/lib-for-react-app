(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'immutable', '../actions/systemError', '../utils/createReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('immutable'), require('../actions/systemError'), require('../utils/createReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.immutable, global.systemError, global.createReducer);
    global.reducerSystemError = mod.exports;
  }
})(this, function (exports, _immutable, _systemError, _createReducer) {
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
});