import some from 'lodash/some';
import pick from 'lodash/pick';
import camelCaseKeys from '../utils/camelCaseKeys';
import * as responseCodes from './consts/responseCodes';

const SuccessCodes = pick(responseCodes, ['SUCCESS']);

// 用于解析网络响应报文的类
export default class FetchResponse {
  static isSuccess(code) {
    return some(SuccessCodes, value => value === code);
  }

  static parseHeader(res) {
    return camelCaseKeys(
      res.header || { code: responseCodes.UNKNOWN, message: '' }
    );
  }

  static parseBody(res) {
    return camelCaseKeys(res.body || {});
  }

  constructor(res) {
    this.header = FetchResponse.parseHeader(res);
    this.body = FetchResponse.parseBody(res);
    this.code = this.header.code;
    this.message = this.header.message;
    this.success = FetchResponse.isSuccess(this.code);
  }
}
