(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'immer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('immer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.immer);
    global.createReducerImmer = mod.exports;
  }
})(this, function (exports, _immer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _immer2 = _interopRequireDefault(_immer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  exports.default = function (initialState, handlers) {
    if (!initialState || !handlers) {
      throw new Error('must pass args of "initialState" and "handlers" to createReducer!');
    }

    return (0, _immer2.default)(function (draft, _ref) {
      var type = _ref.type,
          params = _objectWithoutProperties(_ref, ['type']);

      var action = handlers[type];
      return action && action(draft, params);
    }, initialState);
  };
});