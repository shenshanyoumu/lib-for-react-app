(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './asyncComponent', './camelCaseKeys', './createAPI', './createReducer', './createModule', './moduleUI', './customActionUtil', './customReducerUtil', './customStatusUtil', './isPromise', './isServerSide', './isBrowserSide', './isReactNative', './syncComponent', './toQueryString', './asyncReducers', './getLocale'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./asyncComponent'), require('./camelCaseKeys'), require('./createAPI'), require('./createReducer'), require('./createModule'), require('./moduleUI'), require('./customActionUtil'), require('./customReducerUtil'), require('./customStatusUtil'), require('./isPromise'), require('./isServerSide'), require('./isBrowserSide'), require('./isReactNative'), require('./syncComponent'), require('./toQueryString'), require('./asyncReducers'), require('./getLocale'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.asyncComponent, global.camelCaseKeys, global.createAPI, global.createReducer, global.createModule, global.moduleUI, global.customActionUtil, global.customReducerUtil, global.customStatusUtil, global.isPromise, global.isServerSide, global.isBrowserSide, global.isReactNative, global.syncComponent, global.toQueryString, global.asyncReducers, global.getLocale);
    global.index = mod.exports;
  }
})(this, function (exports, _asyncComponent, _camelCaseKeys, _createAPI, _createReducer, _createModule, _moduleUI, _customActionUtil, _customReducerUtil, _customStatusUtil, _isPromise, _isServerSide, _isBrowserSide, _isReactNative, _syncComponent, _toQueryString, _asyncReducers, _getLocale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _asyncComponent2 = _interopRequireDefault(_asyncComponent);

  var _camelCaseKeys2 = _interopRequireDefault(_camelCaseKeys);

  var _createAPI2 = _interopRequireDefault(_createAPI);

  var _createReducer2 = _interopRequireDefault(_createReducer);

  var _createModule2 = _interopRequireDefault(_createModule);

  var customActionUtil = _interopRequireWildcard(_customActionUtil);

  var customReducerUtil = _interopRequireWildcard(_customReducerUtil);

  var customStatusUtil = _interopRequireWildcard(_customStatusUtil);

  var _isPromise2 = _interopRequireDefault(_isPromise);

  var _isServerSide2 = _interopRequireDefault(_isServerSide);

  var _isBrowserSide2 = _interopRequireDefault(_isBrowserSide);

  var _isReactNative2 = _interopRequireDefault(_isReactNative);

  var _syncComponent2 = _interopRequireDefault(_syncComponent);

  var _toQueryString2 = _interopRequireDefault(_toQueryString);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    asyncComponent: _asyncComponent2.default,
    camelCaseKeys: _camelCaseKeys2.default,
    createAPI: _createAPI2.default,
    createReducer: _createReducer2.default,
    createModule: _createModule2.default,
    getUIActions: _moduleUI.getUIActions,
    initalAsyncReducers: _asyncReducers.initalAsyncReducers,
    customActionUtil: customActionUtil,
    customReducerUtil: customReducerUtil,
    customStatusUtil: customStatusUtil,
    isPromise: _isPromise2.default,
    isServerSide: _isServerSide2.default,
    isBrowserSide: _isBrowserSide2.default,
    isReactNative: _isReactNative2.default,
    syncComponent: _syncComponent2.default,
    toQueryString: _toQueryString2.default,
    getLocale: _getLocale.getLocale,
    IS_CHINESE: _getLocale.IS_CHINESE
  };
});