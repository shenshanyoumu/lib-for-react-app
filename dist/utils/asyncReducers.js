(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux', 'lodash/isEmpty'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux'), require('lodash/isEmpty'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.redux, global.isEmpty);
    global.asyncReducers = mod.exports;
  }
})(this, function (exports, _redux, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.injectReducer = injectReducer;
  exports.initalAsyncReducers = initalAsyncReducers;

  var _isEmpty2 = _interopRequireDefault(_isEmpty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var asyncReducers = {};
  var reducerCounters = {};

  function injectReducer(store, reducers) {
    if ((0, _isEmpty2.default)(reducers)) {
      return;
    }

    Object.keys(reducers).forEach(function (key) {
      reducerCounters[key] = (reducerCounters[key] || 0) + 1;
      asyncReducers[key] = reducers[key];
    });

    // redux的store对象包含replaceReducer函数来替换对应的reducer
    store.replaceReducer((0, _redux.combineReducers)(asyncReducers));
  }

  // 根据给定reducer对象，创建异步reducer
  function initalAsyncReducers(initalReducers) {
    Object.assign(asyncReducers, initalReducers);
  }
});