(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash', 'redux', './moduleUI', './createReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash'), require('redux'), require('./moduleUI'), require('./createReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.redux, global.moduleUI, global.createReducer);
    global.createModuleImmer = mod.exports;
  }
})(this, function (exports, _lodash, _redux, _moduleUI, _createReducer) {
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

  exports.default = function (_ref) {
    var namespace = _ref.namespace,
        state = _ref.state,
        reducers = _ref.reducers,
        _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? {} : _ref$actions,
        _ref$thunks = _ref.thunks,
        thunks = _ref$thunks === undefined ? {} : _ref$thunks;

    if (!namespace || !state || !reducers || (0, _lodash.isEmpty)(actions) && (0, _lodash.isEmpty)(thunks)) {
      throw new Error('must pass args of "namespace, state, reducers, actions or thunks" to createModule!');
    }
    var createActionType = function createActionType(type) {
      return namespace + '/' + type;
    };

    var needInjectUI = Object.prototype.hasOwnProperty.call(state, 'ui');

    var allActions = {};
    var UIReducers = {};
    var UIActions = {};

    if (needInjectUI) {
      UIReducers = (0, _moduleUI.getUIReducers)(namespace);
      UIActions = (0, _moduleUI.getUIActions)(namespace);
    }

    var handlers = Object.entries(reducers).reduce(function (result, reducer) {
      var type = createActionType(reducer[0]);
      result[type] = reducer[1];
      return result;
    }, UIReducers);

    var actionsWithNamespace = Object.entries(actions).reduce(function (result, reducer) {
      var type = createActionType(reducer[0]);
      result[reducer[0]] = function () {
        return _extends({
          type: type
        }, reducer[1].apply(reducer, arguments));
      };
      return result;
    }, {});

    var thunksWithNamespace = Object.entries(thunks).reduce(function (result, reducer) {
      var type = createActionType(reducer[0]);
      result[reducer[0]] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return function (dispatch, getState, extraArgument) {
          return reducer[1].apply(reducer, [_extends({
            namespace: namespace,
            dispatch: dispatch,
            getState: getState,
            extraArgument: extraArgument,
            type: type,
            createActionType: createActionType
          }, (0, _redux.bindActionCreators)(allActions, dispatch))].concat(args));
        };
      };
      return result;
    }, {});

    allActions = _extends({}, actionsWithNamespace, thunksWithNamespace, UIActions);

    return {
      namespace: namespace,
      initialState: state,
      handlers: handlers,
      createActionType: createActionType,
      actions: allActions,
      reducers: (0, _createReducer2.default)(state, handlers)
    };
  };
});