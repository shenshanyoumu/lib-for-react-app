(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'immer', 'immutable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('immer'), require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.immer, global.immutable);
    global.createReducer = mod.exports;
  }
})(this, function (exports, _immer, _immutable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _immer2 = _interopRequireDefault(_immer);

  var _immutable2 = _interopRequireDefault(_immutable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

    var isImmutable = _immutable2.default.Iterable.isIterable(initialState);

    var immutableReducer = function immutableReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var type = _ref.type,
          params = _objectWithoutProperties(_ref, ['type']);

      var action = handlers[type];
      return action ? action(state, _extends({ type: type }, params)) : state;
    };

    var immerReducer = (0, _immer2.default)(function (draft) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var type = _ref2.type,
          params = _objectWithoutProperties(_ref2, ['type']);

      var action = handlers[type];
      return action && action(draft, _extends({ type: type }, params));
    }, initialState);

    return isImmutable ? immutableReducer : immerReducer;
  };
});