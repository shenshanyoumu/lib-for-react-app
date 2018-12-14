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
    global.systemLoading = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.systemShowLoading = systemShowLoading;
  exports.systemHideLoading = systemHideLoading;
  var SYSTEM_SHOW_LOADING = exports.SYSTEM_SHOW_LOADING = '@@system/SHOW_LOADING';
  var SYSTEM_HIDE_LOADING = exports.SYSTEM_HIDE_LOADING = '@@system/HIDE_LOADING';

  // 内置loading，从而在世纪项目中不需要显式编写繁琐的loading状态逻辑
  function systemShowLoading(text) {
    return {
      type: SYSTEM_SHOW_LOADING,
      payload: text
    };
  }

  function systemHideLoading() {
    return {
      type: SYSTEM_HIDE_LOADING
    };
  }
});