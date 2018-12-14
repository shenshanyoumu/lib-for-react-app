export const SYSTEM_SHOW_LOADING = '@@system/SHOW_LOADING';
export const SYSTEM_HIDE_LOADING = '@@system/HIDE_LOADING';

// 内置loading，从而在世纪项目中不需要显式编写繁琐的loading状态逻辑
export function systemShowLoading(text) {
  return {
    type: SYSTEM_SHOW_LOADING,
    payload: text,
  };
}

export function systemHideLoading() {
  return {
    type: SYSTEM_HIDE_LOADING,
  };
}
