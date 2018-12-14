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
    global.httpMethods = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var GET = exports.GET = 'get';
  var POST = exports.POST = 'post';
  var PUT = exports.PUT = 'put';
  var PATCH = exports.PATCH = 'patch';
  var DELETE = exports.DELETE = 'delete';
  var HEAD = exports.HEAD = 'head';
});