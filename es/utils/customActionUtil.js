'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.customShowLoading = customShowLoading;
exports.customTimestampMeta = customTimestampMeta;
exports.customAsyncWrapper = customAsyncWrapper;

var _getTimestamp = require('./getTimestamp');

var _getTimestamp2 = _interopRequireDefault(_getTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customShowLoading(type) {
  return {
    type: type,
    meta: {
      customLoading: true
    }
  };
}

function customTimestampMeta() {
  var meta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends({}, meta, {
    ignoreSystemLoading: true,
    ignoreCustomLoading: false,
    timestamp: (0, _getTimestamp2.default)()
  });
}

function customAsyncWrapper(_ref) {
  var type = _ref.type,
      _ref$payload = _ref.payload,
      api = _ref$payload.api,
      extraActions = _ref$payload.extraActions,
      meta = _ref.meta;

  return function (dispatch) {
    dispatch(customShowLoading(type));

    if (extraActions && extraActions.length > 0) {
      extraActions.forEach(function (action) {
        return dispatch(action);
      });
    }

    return dispatch({
      type: type,
      payload: api,
      meta: _extends({}, customTimestampMeta(meta), {
        ignoreCustomLoading: true
      })
    });
  };
}