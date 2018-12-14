'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withIntl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _BaseComponent2 = require('./BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _withInjectIntl = require('./withInjectIntl');

var _withInjectIntl2 = _interopRequireDefault(_withInjectIntl);

var _getDisplayName = require('./utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _isServerSide = require('./utils/isServerSide');

var _isServerSide2 = _interopRequireDefault(_isServerSide);

var _intlHelper = require('./intlHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fetchIntl = function _fetchIntl(locale, page, host) {
  return (0, _isomorphicFetch2.default)(host + 'lang/' + locale + '/' + page + '.json?_timestamp=' + Date.now(), {
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  });
};

function withIntl(locale, page, host) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    // 为WrappedComponent添加一个ref属性
    withRef: false
  };
  var withRef = options.withRef;


  return function (WrappedComponent) {
    var isServer = (0, _isServerSide2.default)();

    // 为WrappedComponent包裹injectIntl
    // 可在WrappedComponent中使用this.props.intl
    var Component = (0, _withInjectIntl2.default)(WrappedComponent, options);

    var WithIntl = function (_BaseComponent) {
      _inherits(WithIntl, _BaseComponent);

      _createClass(WithIntl, null, [{
        key: 'fetchIntl',
        value: function fetchIntl() {
          return _fetchIntl(locale, page, host);
        }
      }]);

      function WithIntl(props) {
        _classCallCheck(this, WithIntl);

        var _this = _possibleConstructorReturn(this, (WithIntl.__proto__ || Object.getPrototypeOf(WithIntl)).call(this, props));

        var translations = null;

        if (isServer) {
          translations = Object.assign({}, props.intl.messages,
          // props.staticContext是从服务端渲染传过来的
          props.staticContext.localeData);

          (0, _intlHelper.createIntlContext)({
            locale: locale,
            messages: translations
          });
        }

        _this.state = {
          translations: translations
        };
        return _this;
      }

      _createClass(WithIntl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          _fetchIntl(locale, page, host).then(function (localeData) {
            var translations = Object.assign({}, _this2.props.intl.messages, localeData);

            (0, _intlHelper.createIntlContext)({
              locale: locale,
              messages: translations
            });

            _this2.setState({
              translations: translations
            });
          }).catch(function (err) {
            return console.error(err);
          });
        }

        // getWrappedInstance调用时候返回我们的ref="wrappedInstance"

      }, {
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          (0, _invariant2.default)(withRef, '[lib-for-react-app] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`withIntl()`');

          return this._wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var translations = this.state.translations;

          // 如果没获取到当前page的语言包，劫持当前渲染

          if (!translations) {
            return null;
          }

          return _react2.default.createElement(
            _reactIntl.IntlProvider,
            { locale: locale, messages: translations },
            _react2.default.createElement(Component, _extends({}, this.props, {
              ref: function ref(_ref) {
                _this3._wrappedInstance = withRef ? _ref : null;
              }
            }))
          );
        }
      }]);

      return WithIntl;
    }(_BaseComponent3.default);

    WithIntl.displayName = 'withIntl(' + (0, _getDisplayName2.default)(Component) + ')';


    (0, _hoistNonReactStatics2.default)(WithIntl, Component);

    // 为WithIntl再包裹一次injectIntl
    // 为了在当前高阶组件中使用this.props.intl获取顶层IntlProvider传递的intl
    return (0, _withInjectIntl2.default)(WithIntl, options);
  };
}