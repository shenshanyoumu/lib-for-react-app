'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _camelCaseKeys = require('../utils/camelCaseKeys');

var _camelCaseKeys2 = _interopRequireDefault(_camelCaseKeys);

var _responseCodes = require('./consts/responseCodes');

var responseCodes = _interopRequireWildcard(_responseCodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SuccessCodes = (0, _pick2.default)(responseCodes, ['SUCCESS']);

// 用于解析网络响应报文的类

var FetchResponse = function () {
  _createClass(FetchResponse, null, [{
    key: 'isSuccess',
    value: function isSuccess(code) {
      return (0, _some2.default)(SuccessCodes, function (value) {
        return value === code;
      });
    }
  }, {
    key: 'parseHeader',
    value: function parseHeader(res) {
      return (0, _camelCaseKeys2.default)(res.header || { code: responseCodes.UNKNOWN, message: '' });
    }
  }, {
    key: 'parseBody',
    value: function parseBody(res) {
      return (0, _camelCaseKeys2.default)(res.body || {});
    }
  }]);

  function FetchResponse(res) {
    _classCallCheck(this, FetchResponse);

    this.header = FetchResponse.parseHeader(res);
    this.body = FetchResponse.parseBody(res);
    this.code = this.header.code;
    this.message = this.header.message;
    this.success = FetchResponse.isSuccess(this.code);
  }

  return FetchResponse;
}();

exports.default = FetchResponse;