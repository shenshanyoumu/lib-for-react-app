(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react-intl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react-intl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reactIntl);
    global.index = mod.exports;
  }
})(this, function (exports, _reactIntl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createIntlContext = createIntlContext;
  exports.getIntlContext = getIntlContext;
  exports.formatMessage = formatMessage;


  var intl = null;

  // 基于react的context特性来暴露语言包
  function createIntlContext(_ref) {
    var _ref$locale = _ref.locale,
        locale = _ref$locale === undefined ? 'zh-CN' : _ref$locale,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {} : _ref$messages;

    var intlProvider = new _reactIntl.IntlProvider({ locale: locale, messages: messages });
    intl = intlProvider.getChildContext().intl;
    return intl;
  }

  function getIntlContext() {
    return intl;
  }

  function formatMessage() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return intl.formatMessage.apply(intl, args);
  }

  exports.default = {
    createIntlContext: createIntlContext,
    getIntlContext: getIntlContext,
    formatMessage: formatMessage
  };
});