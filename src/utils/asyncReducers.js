import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

const asyncReducers = {};
const reducerCounters = {};

export function injectReducer(store, reducers) {
  if (isEmpty(reducers)) {
    return;
  }

  Object.keys(reducers).forEach(key => {
    reducerCounters[key] = (reducerCounters[key] || 0) + 1;
    asyncReducers[key] = reducers[key];
  });

  // redux的store对象包含replaceReducer函数来替换对应的reducer
  store.replaceReducer(combineReducers(asyncReducers));
}

// 根据给定reducer对象，创建异步reducer
export function initalAsyncReducers(initalReducers) {
  Object.assign(asyncReducers, initalReducers);
}
