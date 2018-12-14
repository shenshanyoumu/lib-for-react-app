'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = syncComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _zipObject = require('lodash/zipObject');

var _zipObject2 = _interopRequireDefault(_zipObject);

var _asyncReducers = require('./asyncReducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function syncComponent(componentOpts) {
  var reducerOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var chunkName = void 0;
  var Component = void 0;
  var reducerKeys = void 0;

  if (typeof componentOpts !== 'string') {
    chunkName = componentOpts.chunkName;
    Component = componentOpts.component.default || componentOpts.component;
    reducerKeys = Object.keys(reducerOpts);
  } else {
    chunkName = componentOpts;
    Component = reducerOpts.default || reducerOpts;
  }

  function SyncComponent(props, context) {
    if (props.staticContext && props.staticContext.splitPoints) {
      props.staticContext.splitPoints.push(chunkName);
    }

    (0, _asyncReducers.injectReducer)(context.store, SyncComponent.reducers);

    return _react2.default.createElement(Component, props);
  }

  SyncComponent.propTypes = {
    staticContext: _propTypes2.default.object.isRequired
  };

  SyncComponent.contextTypes = {
    store: _propTypes2.default.shape({
      replaceReducer: _propTypes2.default.func.isRequired
    })
  };

  SyncComponent.reducers = {};

  SyncComponent.loadReducers = function () {
    if (reducerKeys && reducerKeys.length) {
      var reducerValues = reducerKeys.map(function (key) {
        return reducerOpts[key].default || reducerOpts[key];
      });

      SyncComponent.reducers = (0, _zipObject2.default)(reducerKeys, reducerValues);
    }
  };

  (0, _hoistNonReactStatics2.default)(SyncComponent, Component);

  return SyncComponent;
}