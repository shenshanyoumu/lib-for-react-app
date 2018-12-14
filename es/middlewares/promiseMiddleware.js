'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isPromise = require('../utils/isPromise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _customActionUtil = require('../utils/customActionUtil');

var _systemLoading = require('../actions/systemLoading');

var _systemError = require('../actions/systemError');

var _promiseCounter = require('./promiseCounter');

var _promiseCounter2 = _interopRequireDefault(_promiseCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _systemShowLoading(dispatch) {
  if (_promiseCounter2.default.isEmpty()) {
    dispatch((0, _systemLoading.systemShowLoading)());
  }

  _promiseCounter2.default.countUp();
}

function _systemHideLoading(dispatch) {
  // make sure the count down the PromiseCounter in another event loop
  // to handle we chain the ajax call.
  setTimeout(function () {
    _promiseCounter2.default.countDown();

    // if there is no promise, we relase the loading bar
    if (_promiseCounter2.default.isEmpty()) {
      dispatch((0, _systemLoading.systemHideLoading)());
    }
  });
}

exports.default = function (_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      // We wish all actions follow the FSA standard.
      if (!action.payload) {
        return next(action);
      }
      var promise = action.payload.promise || action.payload;
      if (!(0, _isPromise2.default)(promise)) {
        return next(action);
      }

      var _ref2 = action.meta || {},
          _ref2$ignoreSystemLoa = _ref2.ignoreSystemLoading,
          ignoreSystemLoading = _ref2$ignoreSystemLoa === undefined ? false : _ref2$ignoreSystemLoa,
          _ref2$ignoreCustomLoa = _ref2.ignoreCustomLoading,
          ignoreCustomLoading = _ref2$ignoreCustomLoa === undefined ? true : _ref2$ignoreCustomLoa,
          timestamp = _ref2.timestamp,
          handlers = _ref2.handlers,
          originMetaRest = _objectWithoutProperties(_ref2, ['ignoreSystemLoading', 'ignoreCustomLoading', 'timestamp', 'handlers']);

      if (!ignoreCustomLoading) {
        if (!timestamp) {
          throw new Error('"ignoreCustomLoading: true" in meta, "timestamp" can\'t be undefined');
        }

        var _customShowLoading = (0, _customActionUtil.customShowLoading)(action.type),
            meta = _customShowLoading.meta,
            rest = _objectWithoutProperties(_customShowLoading, ['meta']);
        // 保持自动 customLoading 的action
        // 发送的timestamp与异步请求发起的时间一至（不能使用默认自自动生成的方式），
        // 否则异步请求的时间会晚于 customLoading 而被抛弃


        dispatch(_extends({
          meta: _extends({}, originMetaRest, meta, {
            timestamp: timestamp
          })
        }, rest));
      }
      if (!ignoreSystemLoading) {
        _systemShowLoading(dispatch);
      }

      (0, _systemError.systemCleanError)();

      return promise.then(function (result) {
        if (!ignoreSystemLoading) {
          _systemHideLoading(dispatch);
        }

        if (handlers) {
          var successBeforeReducers = handlers.successBeforeReducers || handlers.success;
          var finallyBeforeReducers = handlers.finallyBeforeReducers || handlers.finally;

          successBeforeReducers && successBeforeReducers(dispatch, getState, result);
          finallyBeforeReducers && finallyBeforeReducers(dispatch, getState);
        }

        dispatch(_extends({}, action, {
          payload: result
        }));

        if (handlers) {
          handlers.successAfterReducers && handlers.successAfterReducers(dispatch, getState, result);
          handlers.finallyAfterReducers && handlers.finallyAfterReducers(dispatch, getState);
        }
        return result;
      }).catch(function (error) {
        if (!ignoreSystemLoading) {
          _systemHideLoading(dispatch);
        }

        if (handlers) {
          var failedBeforeReducers = handlers.failedBeforeReducers || handlers.failed;
          var finallyBeforeReducers = handlers.finallyBeforeReducers || handlers.finally;

          failedBeforeReducers && failedBeforeReducers(dispatch, getState, error);
          finallyBeforeReducers && finallyBeforeReducers(dispatch, getState);
        }

        dispatch(_extends({}, action, {
          payload: error,
          error: true
        }));

        if (handlers) {
          handlers.failedAfterReducers && handlers.failedAfterReducers(dispatch, getState, error);
          handlers.finallyAfterReducers && handlers.finallyAfterReducers(dispatch, getState);
        }

        throw error;
      });
    };
  };
};