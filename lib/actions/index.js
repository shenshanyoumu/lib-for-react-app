'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _systemError = require('./systemError');

var _systemLoading = require('./systemLoading');

exports.default = {
  systemReportError: _systemError.systemReportError,
  systemCleanError: _systemError.systemCleanError,
  systemShowLoading: _systemLoading.systemShowLoading,
  systemHideLoading: _systemLoading.systemHideLoading
};