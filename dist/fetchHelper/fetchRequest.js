(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './fetchException', './consts/exceptionTypes', '../actions/systemError', '../utils/toQueryString', '../utils/isBrowserSide', './fetchResponse', 'isomorphic-fetch'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./fetchException'), require('./consts/exceptionTypes'), require('../actions/systemError'), require('../utils/toQueryString'), require('../utils/isBrowserSide'), require('./fetchResponse'), require('isomorphic-fetch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetchException, global.exceptionTypes, global.systemError, global.toQueryString, global.isBrowserSide, global.fetchResponse, global.isomorphicFetch);
    global.fetchRequest = mod.exports;
  }
})(this, function (exports, _fetchException, _exceptionTypes, _systemError, _toQueryString, _isBrowserSide, _fetchResponse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _fetchException2 = _interopRequireDefault(_fetchException);

  var ExceptionTypes = _interopRequireWildcard(_exceptionTypes);

  var _toQueryString2 = _interopRequireDefault(_toQueryString);

  var _isBrowserSide2 = _interopRequireDefault(_isBrowserSide);

  var _fetchResponse2 = _interopRequireDefault(_fetchResponse);

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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var isTestEnv = process ? process.env.NODE_ENV === 'test' : false;

  // 在浏览器端的测试环境处理异常
  if (isTestEnv && (0, _isBrowserSide2.default)()) {
    window.addEventListener('unhandledrejection', function (e) {
      if (!isTestEnv) {
        console.warn('throw an error, when call fetchHelper', e);
      }
      e.preventDefault();
    });
  }

  // 用于创建fetch请求

  var FetchRequest = function () {
    function FetchRequest() {
      _classCallCheck(this, FetchRequest);
    }

    _createClass(FetchRequest, null, [{
      key: 'connectToRedux',
      value: function connectToRedux(store) {
        FetchRequest.dispatch = store.dispatch;
      }
    }, {
      key: 'preHandleResponse',
      value: function preHandleResponse() {
        return false;
      }
    }]);

    return FetchRequest;
  }();

  FetchRequest.dispatch = null;


  ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach(function (method) {
    FetchRequest[method] = function (path) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$headers = _ref.headers,
          headers = _ref$headers === undefined ? {} : _ref$headers,
          _ref$credentials = _ref.credentials,
          credentials = _ref$credentials === undefined ? 'include' : _ref$credentials,
          _ref$mode = _ref.mode,
          mode = _ref$mode === undefined ? 'cors' : _ref$mode,
          _ref$body = _ref.body,
          body = _ref$body === undefined ? undefined : _ref$body,
          _ref$ajaxCache = _ref.ajaxCache,
          ajaxCache = _ref$ajaxCache === undefined ? true : _ref$ajaxCache,
          isDuplicateKey = _ref.isDuplicateKey;

      var url = path;
      var fetchConfig = {
        method: method,
        headers: headers,
        credentials: credentials,
        mode: mode
      };

      var contentType = fetchConfig.headers['Content-Type'];

      var params = body;
      if (contentType && params) {
        if (contentType !== 'application/json') {
          params = (0, _toQueryString2.default)(params, isDuplicateKey);
        } else {
          params = JSON.stringify(params);
        }
      }

      if (method !== 'get' && method !== 'delete') {
        fetchConfig.body = params;
      } else {
        var paramList = [];
        if (params) {
          paramList.push(params);
        }
        if (ajaxCache) {
          paramList.push('_timestamp=' + Date.now());
        }
        if (paramList.length > 0) {
          url = url + '?' + paramList.join('&');
        }
      }

      return fetch(url, fetchConfig).then(function () {
        var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var ret = FetchRequest.preHandleResponse(res);

        if (ret) {
          throw ret;
        }

        if (res.ok) {
          return res.json();
        }

        throw new Error(JSON.stringify({
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
          body: res.body
        }));
      }).then(function (json) {
        var response = new _fetchResponse2.default(json);
        if (response.success) {
          return _extends({}, response);
        }

        throw new _fetchException2.default(response.message, ExceptionTypes.SERVICE, {
          code: response.code,
          url: url,
          res: _extends({}, response)
        });
      }).catch(function (err) {
        if (FetchRequest.dispatch && err instanceof _fetchException2.default) {
          FetchRequest.dispatch((0, _systemError.systemReportError)(err));
        } else if (!isTestEnv) {
          console.warn(JSON.stringify(err));
        }

        throw err;
      });
    };
  });

  exports.default = FetchRequest;
});