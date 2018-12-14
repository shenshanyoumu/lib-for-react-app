(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.customStatusUtilImmer = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var status = exports.status = {
    INIT: 'init',
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILED: 'failed'
  };

  var isInit = exports.isInit = function isInit(state) {
    return state.status === status.INIT;
  };
  var isLoading = exports.isLoading = function isLoading(state) {
    return state.status === status.LOADING;
  };
  var isSuccess = exports.isSuccess = function isSuccess(state) {
    return state.status === status.SUCCESS;
  };
  var isFailed = exports.isFailed = function isFailed(state) {
    return state.status === status.FAILED;
  };
});