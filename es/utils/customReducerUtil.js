'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customResultParser = undefined;
exports.initCustomState = initCustomState;
exports.getRequestTimestamp = getRequestTimestamp;

var _immutable = require('immutable');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _getTimestamp = require('./getTimestamp');

var _getTimestamp2 = _interopRequireDefault(_getTimestamp);

var _customStatusUtil = require('./customStatusUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var lastTimeStamp = state.get('timestamp');

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
var customResultParser = exports.customResultParser = function customResultParser(state, _ref, parseData) {
  var meta = _ref.meta,
      error = _ref.error,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? { body: {} } : _ref$payload;

  var timestamp = getRequestTimestamp(state, meta);

  if (!timestamp) {
    return state;
  }

  return state.withMutations(function (s) {
    s.set('timestamp', timestamp);

    if (meta && meta.customLoading) {
      s.set('status', _customStatusUtil.status.LOADING);
    } else if (error) {
      s.set('status', _customStatusUtil.status.FAILED);
      s.set('message', payload.message);
    } else {
      s.set('status', _customStatusUtil.status.SUCCESS);

      var data = payload.body;
      if ((0, _isFunction2.default)(parseData)) {
        parseData(s, data);
      } else {
        s.set('data', (0, _immutable.fromJS)(data));
      }
    }
  });
};