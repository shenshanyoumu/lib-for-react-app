export const SYSTEM_REPORT_ERROR = '@@system/REPORT_ERROR';
export const SYSTEM_CLEAN_ERROR = '@@system/CLEAN_ERROR';

// 在发起网络请求时处理一些系统错误信息
export function systemReportError(error) {
  return {
    type: SYSTEM_REPORT_ERROR,
    payload: error,
  };
}

export function systemCleanError() {
  return {
    type: SYSTEM_CLEAN_ERROR,
  };
}
