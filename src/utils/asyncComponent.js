import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import zipObject from 'lodash/zipObject';
import { injectReducer } from './asyncReducers';
import BaseComponent from '../BaseComponent';

// 异步加载组件，以及组件对应的reducer
export default function asyncComponent(componentOpts, reducerOpts = {}) {
  let getComponent;
  let reducerKeys;

  // 根据应用中router的配置，可以得到待加载的组件以及reducer
  if (typeof componentOpts !== 'string') {
    getComponent = componentOpts.getComponent;
    reducerKeys = Object.keys(reducerOpts);
  } else {
    getComponent = reducerOpts;
  }

  return class AsyncComponent extends BaseComponent {
    static contextTypes = {
      store: PropTypes.shape({
        replaceReducer: PropTypes.func.isRequired,
      }),
    };

    static Component = null;

    static reducers = {};

    static loadComponent() {
      return Promise.resolve()
        .then(() => {
          // 如果需要异步加载reducer
          if (reducerKeys && reducerKeys.length) {
            const reducerPromises = reducerKeys.map(key => reducerOpts[key]());

            return Promise.all(reducerPromises)
              .then(reducerMods => reducerMods.map(m => m.reducer || m.default))
              .then(reducerValues => {
                AsyncComponent.reducers = zipObject(reducerKeys, reducerValues);
              });
          }
        })
        .then(() => getComponent())
        .then(m => m.default)
        .then(Component => {
          // 成功异步加载对应组件时挂载到Component静态属性上
          AsyncComponent.Component = Component;

          hoistNonReactStatics(AsyncComponent, Component);

          return Component;
        });
    }

    mounted = false;

    constructor(props, context) {
      super(props, context);

      this.state = {
        Component: AsyncComponent.Component,
      };
    }

    // 该HOC组件在挂载后触发异步加载逻辑
    componentWillMount() {
      if (!this.state.Component) {
        AsyncComponent.loadComponent().then(Component => {
          injectReducer(this.context.store, AsyncComponent.reducers);

          if (this.mounted) {
            this.setState({
              Component,
            });
          }
        });
      } else {
        injectReducer(this.context.store, AsyncComponent.reducers);
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Component } = this.state;

      return Component ? <Component {...this.props} /> : null;
    }
  };
}
