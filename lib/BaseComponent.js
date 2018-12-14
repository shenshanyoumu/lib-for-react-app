'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isReactNative = require('./utils/isReactNative');

var _isReactNative2 = _interopRequireDefault(_isReactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 项目中的component除纯函数化组建外，都应该继承该类。
 */
var BaseComponent = function (_React$Component) {
  _inherits(BaseComponent, _React$Component);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: 'shouldComponentUpdate',

    /**
     * 基于immutable判断，覆写shouldComponentUpdate方法
     * @param nextProps -- 最新props数据
     * @param nextState -- 最新state数据
     * @returns {boolean} -- 组建是否需要更新
     */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps) || !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);
    }

    /**
     * 帮助组建中的函数绑定this（组建实例对象）
     * @param methods -- 需要绑定this的函数名数组
     * @example bind('func1', 'func2');
     */

  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
        methods[_key] = arguments[_key];
      }

      methods.forEach(function (method) {
        return _this2[method] = _this2[method].bind(_this2);
      });
    }
  }]);

  return BaseComponent;
}(_react2.default.Component);

// 在非React Native运行环境配置全局的router/intl上下文


exports.default = BaseComponent;
if (!(0, _isReactNative2.default)()) {
  BaseComponent.contextTypes = {
    router: _propTypes2.default.object.isRequired,
    intl: _propTypes2.default.object.isRequired
  };
}