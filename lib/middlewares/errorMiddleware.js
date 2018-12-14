'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchException = require('../fetchHelper/fetchException');

var _fetchException2 = _interopRequireDefault(_fetchException);

var _exceptionTypes = require('../fetchHelper/consts/exceptionTypes');

var ExceptionTypes = _interopRequireWildcard(_exceptionTypes);

var _systemError = require('../actions/systemError');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      if (!action.error) {
        return next(action);
      }

      var error = action.payload;
      if (error instanceof _fetchException2.default) {
        var title = '异常';
        var lines = [];

        switch (error.type) {
          case ExceptionTypes.HTTP:
            title = '网络异常';
            lines.push('请检查网络连接');
            lines.push('\u72B6\u6001\u7801: ' + error.data.code);
            lines.push('\u72B6\u6001\u4FE1\u606F: ' + error.message);
            break;

          case ExceptionTypes.SERVICE:
            title = '服务异常';
            lines.push('\u8BBF\u95EE ' + error.data.url + ' \u51FA\u9519');
            lines.push('请刷新页面重试');
            lines.push('\u8FD4\u56DE\u7801: ' + error.data.code);
            lines.push('\u8FD4\u56DE\u4FE1\u606F: ' + error.message);
            break;

          default:
            break;
        }

        dispatch((0, _systemError.systemReportError)({
          title: title,
          type: error.type,
          messages: lines
        }));
      } else if (error instanceof Error) {
        if (errorMiddleware.isConsole) {
          console.error(error);
        }
        dispatch((0, _systemError.systemReportError)({
          title: '异常',
          messages: [error.message]
        }));
      }

      return next(action);
    };
  };
}

errorMiddleware.isConsole = false;

exports.default = errorMiddleware;