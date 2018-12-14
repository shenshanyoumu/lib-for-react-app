(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'hoist-non-react-statics', 'lodash/zipObject', './asyncReducers', '../BaseComponent'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('hoist-non-react-statics'), require('lodash/zipObject'), require('./asyncReducers'), require('../BaseComponent'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.hoistNonReactStatics, global.zipObject, global.asyncReducers, global.BaseComponent);
    global.asyncComponent = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _hoistNonReactStatics, _zipObject, _asyncReducers, _BaseComponent2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = asyncComponent;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

  var _zipObject2 = _interopRequireDefault(_zipObject);

  var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  // 异步加载组件，以及组件对应的reducer
  function asyncComponent(componentOpts) {
    var _class, _temp;

    var reducerOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var getComponent = void 0;
    var reducerKeys = void 0;

    // 根据应用中router的配置，可以得到待加载的组件以及reducer
    if (typeof componentOpts !== 'string') {
      getComponent = componentOpts.getComponent;
      reducerKeys = Object.keys(reducerOpts);
    } else {
      getComponent = reducerOpts;
    }

    return _temp = _class = function (_BaseComponent) {
      _inherits(AsyncComponent, _BaseComponent);

      _createClass(AsyncComponent, null, [{
        key: 'loadComponent',
        value: function loadComponent() {
          return Promise.resolve().then(function () {
            // 如果需要异步加载reducer
            if (reducerKeys && reducerKeys.length) {
              var reducerPromises = reducerKeys.map(function (key) {
                return reducerOpts[key]();
              });

              return Promise.all(reducerPromises).then(function (reducerMods) {
                return reducerMods.map(function (m) {
                  return m.reducer || m.default;
                });
              }).then(function (reducerValues) {
                AsyncComponent.reducers = (0, _zipObject2.default)(reducerKeys, reducerValues);
              });
            }
          }).then(function () {
            return getComponent();
          }).then(function (m) {
            return m.default;
          }).then(function (Component) {
            // 成功异步加载对应组件时挂载到Component静态属性上
            AsyncComponent.Component = Component;

            (0, _hoistNonReactStatics2.default)(AsyncComponent, Component);

            return Component;
          });
        }
      }]);

      function AsyncComponent(props, context) {
        _classCallCheck(this, AsyncComponent);

        var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props, context));

        _this.mounted = false;


        _this.state = {
          Component: AsyncComponent.Component
        };
        return _this;
      }

      // 该HOC组件在挂载后触发异步加载逻辑


      _createClass(AsyncComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          if (!this.state.Component) {
            AsyncComponent.loadComponent().then(function (Component) {
              (0, _asyncReducers.injectReducer)(_this2.context.store, AsyncComponent.reducers);

              if (_this2.mounted) {
                _this2.setState({
                  Component: Component
                });
              }
            });
          } else {
            (0, _asyncReducers.injectReducer)(this.context.store, AsyncComponent.reducers);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.mounted = true;
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: 'render',
        value: function render() {
          var Component = this.state.Component;


          return Component ? _react2.default.createElement(Component, this.props) : null;
        }
      }]);

      return AsyncComponent;
    }(_BaseComponent3.default), _class.contextTypes = {
      store: _propTypes2.default.shape({
        replaceReducer: _propTypes2.default.func.isRequired
      })
    }, _class.Component = null, _class.reducers = {}, _temp;
  }
});