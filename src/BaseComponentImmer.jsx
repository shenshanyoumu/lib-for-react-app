import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isReactNative from './utils/isReactNative';

/**
 * 项目中的component除纯函数化组建外，都应该继承该类。
 */
export default class BaseComponent extends PureComponent {
  /**
   * 帮助组建中的函数绑定this（组建实例对象）
   * @param methods -- 需要绑定this的函数名数组
   * @example bind('func1', 'func2');
   */
  bind(...methods) {
    methods.forEach(method => (this[method] = this[method].bind(this)));
  }
}

if (!isReactNative()) {
  BaseComponent.contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };
}
