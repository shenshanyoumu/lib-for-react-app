'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _consts = require('../fetchHelper/consts');

var _consts2 = _interopRequireDefault(_consts);

var _processHeaders = require('./processHeaders');

var _processHeaders2 = _interopRequireDefault(_processHeaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function request(FetchRequest, HttpMethod, url, params, options) {
  var defaultOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  // create request headers
  var requestOptions = _extends({}, defaultOptions, options, {
    headers: (0, _processHeaders2.default)(_extends({}, defaultOptions.headers, options.headers))
  });

  // translate 'x-requested-with' to 'X-Requested-With'
  if ('x-requested-with' in requestOptions.headers) {
    requestOptions.headers['X-Requested-With'] = requestOptions.headers['x-requested-with'];
    delete requestOptions.headers['x-requested-with'];
  }

  // create request body
  if (params) {
    // do not set headers.contentType when submit FormData
    if (typeof FormData !== 'undefined' && params instanceof FormData) {
      requestOptions.body = params;
      delete requestOptions.headers['Content-Type'];
    } else if ((0, _isArray2.default)(params)) {
      // post request payload can be a array
      requestOptions.body = [].concat(_toConsumableArray(params));
    } else {
      requestOptions.body = _extends({}, params);
    }
  }

  return FetchRequest[HttpMethod](url, requestOptions);
}

var headers = {
  'Content-Type': 'application/json'
};

exports.default = function (FetchRequest) {
  var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    get: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.GET, url, params, _extends({}, globalOptions, options));
    },
    delete: function _delete(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.DELETE, url, params, _extends({}, globalOptions, options));
    },
    post: function post(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.POST, url, params, _extends({
        headers: headers
      }, globalOptions, options));
    },
    put: function put(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.PUT, url, params, _extends({
        headers: headers
      }, globalOptions, options));
    },
    patch: function patch(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.PATCH, url, params, _extends({
        headers: headers
      }, globalOptions, options));
    },
    head: function head(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return request(FetchRequest, _consts2.default.HttpMethods.HEAD, url, params, _extends({
        headers: headers
      }, globalOptions, options));
    }
  };
};