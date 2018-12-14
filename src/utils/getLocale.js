import cookie from 'js-cookie';

// 获得当前执行环境的语言类别
const getLanguage = () => {
  const language = cookie.get('language') || window.navigator.language;
  if (/^en/i.test(language)) {
    return 'en';
  }
  return language.replace('_', '-');
};

export function getLocale({
  defaultLocale = 'zh-CN',
  supportLocale = ['zh-CN', 'en'],
  __SERVER__ = false,
} = {}) {
  const locale = __SERVER__ ? global.__LOCALE__ : getLanguage();
  if (!locale || !supportLocale.includes(locale)) {
    return defaultLocale;
  }

  return locale;
}

export const IS_CHINESE = /^zh/i.test(getLocale());
