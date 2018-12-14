import { IntlProvider } from 'react-intl';

let intl = null;

// 基于react的context特性来暴露语言包
export function createIntlContext({ locale = 'zh-CN', messages = {} }) {
  const intlProvider = new IntlProvider({ locale, messages });
  intl = intlProvider.getChildContext().intl;
  return intl;
}

export function getIntlContext() {
  return intl;
}

export function formatMessage(...args) {
  return intl.formatMessage.apply(intl, args);
}

export default {
  createIntlContext,
  getIntlContext,
  formatMessage,
};
