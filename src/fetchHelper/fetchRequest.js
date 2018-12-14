import 'isomorphic-fetch';
import FetchException from './fetchException';
import * as ExceptionTypes from './consts/exceptionTypes';
import { systemReportError } from '../actions/systemError';
import toQueryString from '../utils/toQueryString';
import isBrowserSide from '../utils/isBrowserSide';
import FetchResponse from './fetchResponse';

const isTestEnv = process ? process.env.NODE_ENV === 'test' : false;

// 在浏览器端的测试环境处理异常
if (isTestEnv && isBrowserSide()) {
  window.addEventListener('unhandledrejection', e => {
    if (!isTestEnv) {
      console.warn('throw an error, when call fetchHelper', e);
    }
    e.preventDefault();
  });
}

// 用于创建fetch请求
class FetchRequest {
  static dispatch = null;

  /**
   * 绑定redux的store.dispatch方法到FetchRequest类方法，从而可以触发action
   * @param store - redux store
   */
  static connectToRedux(store) {
    FetchRequest.dispatch = store.dispatch;
  }

  /**
   * 预处理fetch请求响应头
   */
  static preHandleResponse() {
    return false;
  }
}

['get', 'post', 'put', 'patch', 'delete', 'head'].forEach(method => {
  FetchRequest[method] = (
    path,
    {
      headers = {},
      credentials = 'include',
      mode = 'cors',
      body = undefined,
      ajaxCache = true,
      isDuplicateKey,
    } = {}
  ) => {
    let url = path;
    const fetchConfig = {
      method,
      headers,
      credentials,
      mode,
    };

    const contentType = fetchConfig.headers['Content-Type'];

    let params = body;
    if (contentType && params) {
      if (contentType !== 'application/json') {
        params = toQueryString(params, isDuplicateKey);
      } else {
        params = JSON.stringify(params);
      }
    }

    if (method !== 'get' && method !== 'delete') {
      fetchConfig.body = params;
    } else {
      const paramList = [];
      if (params) {
        paramList.push(params);
      }
      if (ajaxCache) {
        paramList.push(`_timestamp=${Date.now()}`);
      }
      if (paramList.length > 0) {
        url = `${url}?${paramList.join('&')}`;
      }
    }

    return fetch(url, fetchConfig)
      .then((res = {}) => {
        const ret = FetchRequest.preHandleResponse(res);

        if (ret) {
          throw ret;
        }

        if (res.ok) {
          return res.json();
        }

        throw new Error(
          JSON.stringify({
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            body: res.body,
          })
        );
      })
      .then(json => {
        const response = new FetchResponse(json);
        if (response.success) {
          return {
            ...response,
          };
        }

        throw new FetchException(response.message, ExceptionTypes.SERVICE, {
          code: response.code,
          url,
          res: {
            ...response,
          },
        });
      })
      .catch(err => {
        if (FetchRequest.dispatch && err instanceof FetchException) {
          FetchRequest.dispatch(systemReportError(err));
        } else if (!isTestEnv) {
          console.warn(JSON.stringify(err));
        }

        throw err;
      });
  };
});

export default FetchRequest;
