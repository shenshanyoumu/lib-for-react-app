(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/systemLoading', '../utils/createReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/systemLoading'), require('../utils/createReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.systemLoading, global.createReducer);
    global.reducerSystemLoadingImmer = mod.exports;
  }
})(this, function (exports, _systemLoading, _createReducer) {
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
});