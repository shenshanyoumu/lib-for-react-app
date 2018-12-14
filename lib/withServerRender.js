'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withServerRender;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _BaseComponent2 = require('./BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _getDisplayName = require('./utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _isBrowserSide = require('./utils/isBrowserSide');

var _isBrowserSide2 = _interopRequireDefault(_isBrowserSide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withServerRender() {
  return function (WrappedComponent) {
    var isBrowser = (0, _isBrowserSide2.default)();

    var WithServerRender = function (_BaseComponent) {
      _inherits(WithServerRender, _BaseComponent);

      function WithServerRender() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WithServerRender);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithServerRender.__proto__ || Object.getPrototypeOf(WithServerRender)).call.apply(_ref, [this].concat(args))), _this), _this.isPreload = isBrowser ? window.__IS_PRELOAD__ : null, _temp), _possibleConstructorReturn(_this, _ret);
      }

      // 如果当前执行环境为浏览器端，则判断是否存在预加载逻辑


      _createClass(WithServerRender, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (isBrowser) {
            window.__IS_PRELOAD__ = false;
            this.isPreload = window.__IS_PRELOAD__;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var props = {
            isPreload: this.isPreload
          };

          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, props));
        }
      }]);

      return WithServerRender;
    }(_BaseComponent3.default);

    WithServerRender.displayName = 'withServerRender(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';


    (0, _hoistNonReactStatics2.default)(WithServerRender, WrappedComponent);

    return WithServerRender;
  };
}