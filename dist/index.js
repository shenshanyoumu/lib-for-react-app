(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './BaseComponent', './withIntl', './withInjectIntl', './withServerRender', './actions', './reducers', './utils', './middlewares', './fetchHelper', './intlHelper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./BaseComponent'), require('./withIntl'), require('./withInjectIntl'), require('./withServerRender'), require('./actions'), require('./reducers'), require('./utils'), require('./middlewares'), require('./fetchHelper'), require('./intlHelper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseComponent, global.withIntl, global.withInjectIntl, global.withServerRender, global.actions, global.reducers, global.utils, global.middlewares, global.fetchHelper, global.intlHelper);
    global.index = mod.exports;
  }
})(this, function (exports, _BaseComponent, _withIntl, _withInjectIntl, _withServerRender, _actions, _reducers, _utils, _middlewares, _fetchHelper, _intlHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IntlHelper = exports.FetchHelper = exports.Middlewares = exports.Utils = exports.Reducers = exports.Actions = exports.withServerRender = exports.withInjectIntl = exports.withIntl = exports.BaseComponent = undefined;

  var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

  var _withIntl2 = _interopRequireDefault(_withIntl);

  var _withInjectIntl2 = _interopRequireDefault(_withInjectIntl);

  var _withServerRender2 = _interopRequireDefault(_withServerRender);

  var _actions2 = _interopRequireDefault(_actions);

  var _reducers2 = _interopRequireDefault(_reducers);

  var _utils2 = _interopRequireDefault(_utils);

  var _middlewares2 = _interopRequireDefault(_middlewares);

  var _fetchHelper2 = _interopRequireDefault(_fetchHelper);

  var _intlHelper2 = _interopRequireDefault(_intlHelper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.BaseComponent = _BaseComponent2.default;
  exports.withIntl = _withIntl2.default;
  exports.withInjectIntl = _withInjectIntl2.default;
  exports.withServerRender = _withServerRender2.default;
  exports.Actions = _actions2.default;
  exports.Reducers = _reducers2.default;
  exports.Utils = _utils2.default;
  exports.Middlewares = _middlewares2.default;
  exports.FetchHelper = _fetchHelper2.default;
  exports.IntlHelper = _intlHelper2.default;
});