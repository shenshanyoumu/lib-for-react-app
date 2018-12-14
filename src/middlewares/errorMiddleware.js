import FetchException from '../fetchHelper/fetchException';
import * as ExceptionTypes from '../fetchHelper/consts/exceptionTypes';
import { systemReportError } from '../actions/systemError';

function errorMiddleware({ dispatch }) {
  return next => action => {
    if (!action.error) {
      return next(action);
    }

    const error = action.payload;
    if (error instanceof FetchException) {
      let title = '异常';
      const lines = [];

      switch (error.type) {
        case ExceptionTypes.HTTP:
          title = '网络异常';
          lines.push('请检查网络连接');
          lines.push(`状态码: ${error.data.code}`);
          lines.push(`状态信息: ${error.message}`);
          break;

        case ExceptionTypes.SERVICE:
          title = '服务异常';
          lines.push(`访问 ${error.data.url} 出错`);
          lines.push('请刷新页面重试');
          lines.push(`返回码: ${error.data.code}`);
          lines.push(`返回信息: ${error.message}`);
          break;

        default:
          break;
      }

      dispatch(
        systemReportError({
          title,
          type: error.type,
          messages: lines,
        })
      );
    } else if (error instanceof Error) {
      if (errorMiddleware.isConsole) {
        console.error(error);
      }
      dispatch(
        systemReportError({
          title: '异常',
          messages: [error.message],
        })
      );
    }

    return next(action);
  };
}

errorMiddleware.isConsole = false;

export default errorMiddleware;
