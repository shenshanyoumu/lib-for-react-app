import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import BaseComponent from './BaseComponent';
import getDisplayName from './utils/getDisplayName';
import isBrowserSide from './utils/isBrowserSide';

export default function withServerRender() {
  return WrappedComponent => {
    const isBrowser = isBrowserSide();

    class WithServerRender extends BaseComponent {
      static displayName = `withServerRender(${getDisplayName(
        WrappedComponent
      )})`;

      // 如果当前执行环境为浏览器端，则判断是否存在预加载逻辑
      isPreload = isBrowser ? window.__IS_PRELOAD__ : null;

      componentDidMount() {
        if (isBrowser) {
          window.__IS_PRELOAD__ = false;
          this.isPreload = window.__IS_PRELOAD__;
        }
      }

      render() {
        const props = {
          isPreload: this.isPreload,
        };

        return <WrappedComponent {...this.props} {...props} />;
      }
    }

    hoistNonReactStatics(WithServerRender, WrappedComponent);

    return WithServerRender;
  };
}
