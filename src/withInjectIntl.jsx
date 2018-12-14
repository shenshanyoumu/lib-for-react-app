import React from 'react';
import { injectIntl } from 'react-intl';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function withInjectIntl(WrappedComponent, options) {
  const Component = injectIntl(WrappedComponent, options);

  // react-intl的injectIntl高阶组件会丢失Component中的所有静态方法
  // 封装一层withInjectIntl，用来拷贝静态方法
  hoistNonReactStatics(Component, WrappedComponent);

  return Component;
}
