import asyncComponent from './asyncComponent';
import camelCaseKeys from './camelCaseKeys';
import createAPI from './createAPI';
import createReducer from './createReducer';
import createModule from './createModule';
import { getUIActions } from './moduleUI';
import * as customActionUtil from './customActionUtil';
import * as customReducerUtil from './customReducerUtil';
import * as customStatusUtil from './customStatusUtil';
import isPromise from './isPromise';
import isServerSide from './isServerSide';
import isBrowserSide from './isBrowserSide';
import isReactNative from './isReactNative';
import syncComponent from './syncComponent';
import toQueryString from './toQueryString';
import { initalAsyncReducers } from './asyncReducers';
import { getLocale, IS_CHINESE } from './getLocale';

export default {
  asyncComponent,
  camelCaseKeys,
  createAPI,
  createReducer,
  createModule,
  getUIActions,
  initalAsyncReducers,
  customActionUtil,
  customReducerUtil,
  customStatusUtil,
  isPromise,
  isServerSide,
  isBrowserSide,
  isReactNative,
  syncComponent,
  toQueryString,
  getLocale,
  IS_CHINESE,
};
