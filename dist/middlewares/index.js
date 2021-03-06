(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux-thunk', './promiseMiddleware', './errorMiddleware'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux-thunk'), require('./promiseMiddleware'), require('./errorMiddleware'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reduxThunk, global.promiseMiddleware, global.errorMiddleware);
    global.index = mod.exports;
  }
})(this, function (exports, _reduxThunk, _promiseMiddleware, _errorMiddleware) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);

  var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // 注意中间件的执行顺序，在redux实现中applyMiddleware函数内部使用调用compose函数，而compose函数内部使用reduceRight
  // 来铰链中间件，因此action最先被errorMiddleware拦截
  var middlewares = [_errorMiddleware2.default, _reduxThunk2.default, _promiseMiddleware2.default];

  /**
   * 向外提供的middlewar包括：
   * errorMiddleware，promiseMiddleware, thunkMiddleware
   */
  exports.default = {
    promiseMiddleware: _promiseMiddleware2.default,
    thunkMiddleware: _reduxThunk2.default,
    errorMiddleware: _errorMiddleware2.default,
    middlewares: middlewares
  };
});