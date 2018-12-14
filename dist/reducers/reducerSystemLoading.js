(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'immutable', '../actions/systemLoading', '../utils/createReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('immutable'), require('../actions/systemLoading'), require('../utils/createReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.immutable, global.systemLoading, global.createReducer);
    global.reducerSystemLoading = mod.exports;
  }
})(this, function (exports, _immutable, _systemLoading, _createReducer) {
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
    display: false,
    text: ''
  });

  var handlers = (_handlers = {}, _defineProperty(_handlers, _systemLoading.SYSTEM_SHOW_LOADING, function (state, _ref) {
    var _ref$payload = _ref.payload,
        payload = _ref$payload === undefined ? { text: '' } : _ref$payload;
    var text = payload.text;


    return state.withMutations(function (s) {
      s.set('display', true);
      s.set('text', text);
    });
  }), _defineProperty(_handlers, _systemLoading.SYSTEM_HIDE_LOADING, function (state) {
    return state.withMutations(function (s) {
      s.set('display', false);
      s.set('text', '');
    });
  }), _handlers);

  exports.default = (0, _createReducer2.default)(initialState, handlers);
});