(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isFunction', './getTimestamp', './customStatusUtil'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isFunction'), require('./getTimestamp'), require('./customStatusUtil'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isFunction, global.getTimestamp, global.customStatusUtil);
    global.customReducerUtilImmer = mod.exports;
  }
})(this, function (exports, _isFunction, _getTimestamp, _customStatusUtil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initCustomState = initCustomState;
  exports.getRequestTimestamp = getRequestTimestamp;
  exports.customResultParser = customResultParser;

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _getTimestamp2 = _interopRequireDefault(_getTimestamp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** 初始化 自定义 reducer state
   *
   * @param data
   * @returns {{loading: boolean, error: boolean, message: string, timestamp: null, data: (*|{})}}
   */
  function initCustomState(data) {
    return {
      status: _customStatusUtil.status.INIT,
      message: '',
      timestamp: null,
      data: data || {}
    };
  }

  /** 如果当前请的发起时间晚于最后一次请求的时间，则视为有效时间并返回时间，否则返回null
   *
   * @param state
   * @param meta
   * @returns {null}
   */
  function getRequestTimestamp(state) {
    var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var timestamp = meta.timestamp;

    var lastTimeStamp = state.timestamp;

    if (!timestamp) {
      return (0, _getTimestamp2.default)();
    } else if (lastTimeStamp && lastTimeStamp > timestamp) {
      return null;
    }

    return timestamp;
  }

  /** 自定义数据解析
   *
   * @param state
   * @param meta
   * @param error
   * @param payload
   * @param parseData
   * @returns {*}
   * @example parseData必需是一个函数：
   * (state, data) => {
   *    state.setIn(['data', 'pageInfo', 'currentPage'], data.currentPage || 1);
        state.setIn(['data', 'pageInfo', 'totalCount'], data.totalCount || 0);
        state.setIn(['data', 'list'], fromJS(data.list || []));
   * }
   */

  /* eslint-disable */
  function customResultParser(state, _ref, parseData) {
    var meta = _ref.meta,
        error = _ref.error,
        _ref$payload = _ref.payload,
        payload = _ref$payload === undefined ? { body: {} } : _ref$payload;

    var timestamp = getRequestTimestamp(state, meta);

    if (!timestamp) {
      return state;
    }
    state.timestamp = timestamp;
    if (meta && meta.customLoading) {
      state.status = _customStatusUtil.status.LOADING;
    } else if (error) {
      state.status = _customStatusUtil.status.FAILED;
      state.message = payload.message;
    } else {
      state.status = _customStatusUtil.status.SUCCESS;

      var data = payload.body;
      if ((0, _isFunction2.default)(parseData)) {
        parseData(state, data);
      } else {
        state.data = data;
      }
    }
    return state;
  }
  /* eslint-enable */
});