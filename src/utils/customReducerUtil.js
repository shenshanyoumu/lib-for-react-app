import { fromJS } from 'immutable';
import isFunction from 'lodash/isFunction';
import getTimestamp from './getTimestamp';
import { status as _status } from './customStatusUtil';

/** 初始化 自定义 reducer state
 *
 * @param data
 * @returns {{loading: boolean, error: boolean, message: string, timestamp: null, data: (*|{})}}
 */
export function initCustomState(data) {
  return {
    status: _status.INIT,
    message: '',
    timestamp: null,
    data: data || {},
  };
}

/** 如果当前请的发起时间晚于最后一次请求的时间，则视为有效时间并返回时间，否则返回null
 *
 * @param state
 * @param meta
 * @returns {null}
 */
export function getRequestTimestamp(state, meta = {}) {
  const { timestamp } = meta;
  const lastTimeStamp = state.get('timestamp');

  if (!timestamp) {
    return getTimestamp();
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
export const customResultParser = (
  state,
  { meta, error, payload = { body: {} } },
  parseData
) => {
  const timestamp = getRequestTimestamp(state, meta);

  if (!timestamp) {
    return state;
  }

  return state.withMutations(s => {
    s.set('timestamp', timestamp);

    if (meta && meta.customLoading) {
      s.set('status', _status.LOADING);
    } else if (error) {
      s.set('status', _status.FAILED);
      s.set('message', payload.message);
    } else {
      s.set('status', _status.SUCCESS);

      const data = payload.body;
      if (isFunction(parseData)) {
        parseData(s, data);
      } else {
        s.set('data', fromJS(data));
      }
    }
  });
};
