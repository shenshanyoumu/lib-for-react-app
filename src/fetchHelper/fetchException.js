import * as ExceptionTypes from './consts/exceptionTypes';

// 网络请求异常
export default class FetchException {
  constructor(message, type = ExceptionTypes.HTTP, data = {}) {
    this.name = 'Fetch_Exception';
    this.message = message;
    this.type = type;
    this.data = data;
  }
}
