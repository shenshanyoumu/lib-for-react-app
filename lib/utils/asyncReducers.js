'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectReducer = injectReducer;
exports.initalAsyncReducers = initalAsyncReducers;

var _redux = require('redux');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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