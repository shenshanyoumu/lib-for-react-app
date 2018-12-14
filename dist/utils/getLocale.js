(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'js-cookie'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('js-cookie'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jsCookie);
    global.getLocale = mod.exports;
  }
})(this, function (exports, _jsCookie) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IS_CHINESE = undefined;
  exports.getLocale = getLocale;

  var _jsCookie2 = _interopRequireDefault(_jsCookie);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // 获得当前执行环境的语言类别
  var getLanguage = function getLanguage() {
    var language = _jsCookie2.default.get('language') || window.navigator.language;
    if (/^en/i.test(language)) {
      return 'en';
    }
    return language.replace('_', '-');
  };

  function getLocale() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$defaultLocale = _ref.defaultLocale,
        defaultLocale = _ref$defaultLocale === undefined ? 'zh-CN' : _ref$defaultLocale,
        _ref$supportLocale = _ref.supportLocale,
        supportLocale = _ref$supportLocale === undefined ? ['zh-CN', 'en'] : _ref$supportLocale,
        _ref$__SERVER__ = _ref.__SERVER__,
        __SERVER__ = _ref$__SERVER__ === undefined ? false : _ref$__SERVER__;

    var locale = __SERVER__ ? global.__LOCALE__ : getLanguage();
    if (!locale || !supportLocale.includes(locale)) {
      return defaultLocale;
    }

    return locale;
  }

  var IS_CHINESE = exports.IS_CHINESE = /^zh/i.test(getLocale());
});