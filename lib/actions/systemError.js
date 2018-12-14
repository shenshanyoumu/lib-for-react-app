'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemReportError = systemReportError;
exports.systemCleanError = systemCleanError;
var SYSTEM_REPORT_ERROR = exports.SYSTEM_REPORT_ERROR = '@@system/REPORT_ERROR';
var SYSTEM_CLEAN_ERROR = exports.SYSTEM_CLEAN_ERROR = '@@system/CLEAN_ERROR';

// 在发起网络请求时处理一些系统错误信息
function systemReportError(error) {
  return {
    type: SYSTEM_REPORT_ERROR,
    payload: error
  };
}

function systemCleanError() {
  return {
    type: SYSTEM_CLEAN_ERROR
  };
}