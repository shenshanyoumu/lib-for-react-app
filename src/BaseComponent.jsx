import React from 'react';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import PropTypes from 'prop-types';
import isReactNative from './utils/isReactNative';

/**
 * 项目中的component除纯函数化组建外，都应该继承该类。
 */
export default class BaseComponent extends React.Component {
  /**
   * 基于immutable判断，覆写shouldComponentUpdate方法
   * @param nextProps -- 最新props数据
   * @param nextState -- 最新state数据
   * @returns {boolean} -- 组建是否需要更新
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqualImmutable(this.props, nextProps) ||
      !shallowEqualImmutable(this.state, nextState)
    );
  }

  /**
   * 帮助组建中的函数绑定this（组建实例对象）
   * @param methods -- 需要绑定this的函数名数组
   * @example bind('func1', 'func2');
   */
  bind(...methods) {
    methods.forEach(method => (this[method] = this[method].bind(this)));
  }
}

// 在非React Native运行环境配置全局的router/intl上下文
if (!isReactNative()) {
  BaseComponent.contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };
}
