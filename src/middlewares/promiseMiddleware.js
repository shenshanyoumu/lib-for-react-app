import isPromise from '../utils/isPromise';
import { customShowLoading } from '../utils/customActionUtil';
import { systemShowLoading, systemHideLoading } from '../actions/systemLoading';
import { systemCleanError } from '../actions/systemError';
import PromiseCounter from './promiseCounter';

function _systemShowLoading(dispatch) {
  if (PromiseCounter.isEmpty()) {
    dispatch(systemShowLoading());
  }

  PromiseCounter.countUp();
}

function _systemHideLoading(dispatch) {
  // make sure the count down the PromiseCounter in another event loop
  // to handle we chain the ajax call.
  setTimeout(() => {
    PromiseCounter.countDown();

    // if there is no promise, we relase the loading bar
    if (PromiseCounter.isEmpty()) {
      dispatch(systemHideLoading());
    }
  });
}

export default ({ dispatch, getState }) => next => action => {
  // We wish all actions follow the FSA standard.
  if (!action.payload) {
    return next(action);
  }
  const promise = action.payload.promise || action.payload;
  if (!isPromise(promise)) {
    return next(action);
  }

  const {
    ignoreSystemLoading = false,
    ignoreCustomLoading = true,
    timestamp,
    handlers,
    ...originMetaRest
  } = action.meta || {};

  if (!ignoreCustomLoading) {
    if (!timestamp) {
      throw new Error(
        '"ignoreCustomLoading: true" in meta, "timestamp" can\'t be undefined'
      );
    }
    const { meta, ...rest } = customShowLoading(action.type);
    // 保持自动 customLoading 的action
    // 发送的timestamp与异步请求发起的时间一至（不能使用默认自自动生成的方式），
    // 否则异步请求的时间会晚于 customLoading 而被抛弃
    dispatch({
      meta: {
        ...originMetaRest,
        ...meta,
        timestamp,
      },
      ...rest,
    });
  }
  if (!ignoreSystemLoading) {
    _systemShowLoading(dispatch);
  }

  systemCleanError();

  return promise
    .then(result => {
      if (!ignoreSystemLoading) {
        _systemHideLoading(dispatch);
      }

      if (handlers) {
        const successBeforeReducers =
          handlers.successBeforeReducers || handlers.success;
        const finallyBeforeReducers =
          handlers.finallyBeforeReducers || handlers.finally;

        successBeforeReducers &&
          successBeforeReducers(dispatch, getState, result);
        finallyBeforeReducers && finallyBeforeReducers(dispatch, getState);
      }

      dispatch({
        ...action,
        payload: result,
      });

      if (handlers) {
        handlers.successAfterReducers &&
          handlers.successAfterReducers(dispatch, getState, result);
        handlers.finallyAfterReducers &&
          handlers.finallyAfterReducers(dispatch, getState);
      }
      return result;
    })
    .catch(error => {
      if (!ignoreSystemLoading) {
        _systemHideLoading(dispatch);
      }

      if (handlers) {
        const failedBeforeReducers =
          handlers.failedBeforeReducers || handlers.failed;
        const finallyBeforeReducers =
          handlers.finallyBeforeReducers || handlers.finally;

        failedBeforeReducers && failedBeforeReducers(dispatch, getState, error);
        finallyBeforeReducers && finallyBeforeReducers(dispatch, getState);
      }

      dispatch({
        ...action,
        payload: error,
        error: true,
      });

      if (handlers) {
        handlers.failedAfterReducers &&
          handlers.failedAfterReducers(dispatch, getState, error);
        handlers.finallyAfterReducers &&
          handlers.finallyAfterReducers(dispatch, getState);
      }

      throw error;
    });
};
