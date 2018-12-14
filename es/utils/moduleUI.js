'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUIReducersImmer = exports.getUIReducers = exports.getUIActions = exports.getUITypes = undefined;

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getUITypes = exports.getUITypes = function getUITypes(namespace) {
  return {
    MERGE_UI: namespace + '/MERGE_UI',
    ASSIGN_UI: namespace + '/ASSIGN_UI',
    RESET_UI: namespace + '/RESET_UI'
  };
};

var getUIActions = exports.getUIActions = function getUIActions(namespace) {
  var _getUITypes = getUITypes(namespace),
      MERGE_UI = _getUITypes.MERGE_UI,
      ASSIGN_UI = _getUITypes.ASSIGN_UI,
      RESET_UI = _getUITypes.RESET_UI;

  return {
    mergeUI: function mergeUI(payload) {
      return {
        type: MERGE_UI,
        payload: payload
      };
    },
    assignUI: function assignUI(payload) {
      return {
        type: ASSIGN_UI,
        payload: payload
      };
    },
    resetUI: function resetUI(payload) {
      return {
        type: RESET_UI,
        payload: payload
      };
    }
  };
};

var getUIReducers = exports.getUIReducers = function getUIReducers(namespace) {
  var _ref4;

  var _getUITypes2 = getUITypes(namespace),
      MERGE_UI = _getUITypes2.MERGE_UI,
      ASSIGN_UI = _getUITypes2.ASSIGN_UI,
      RESET_UI = _getUITypes2.RESET_UI;

  return _ref4 = {}, _defineProperty(_ref4, MERGE_UI, function (state, _ref) {
    var _ref$payload = _ref.payload,
        payload = _ref$payload === undefined ? {} : _ref$payload;

    return state.update('ui', function (ui) {
      return ui.mergeDeep(payload);
    });
  }), _defineProperty(_ref4, ASSIGN_UI, function (state, _ref2) {
    var _ref2$payload = _ref2.payload,
        payload = _ref2$payload === undefined ? {} : _ref2$payload;

    return state.update('ui', function (ui) {
      return ui.merge(payload);
    });
  }), _defineProperty(_ref4, RESET_UI, function (state, _ref3) {
    var _ref3$payload = _ref3.payload,
        payload = _ref3$payload === undefined ? {} : _ref3$payload;

    return state.set('ui', payload);
  }), _ref4;
};

/* eslint no-param-reassign: "off" */
var getUIReducersImmer = exports.getUIReducersImmer = function getUIReducersImmer(namespace) {
  var _ref8;

  var _getUITypes3 = getUITypes(namespace),
      MERGE_UI = _getUITypes3.MERGE_UI,
      ASSIGN_UI = _getUITypes3.ASSIGN_UI,
      RESET_UI = _getUITypes3.RESET_UI;

  return _ref8 = {}, _defineProperty(_ref8, MERGE_UI, function (state, _ref5) {
    var _ref5$payload = _ref5.payload,
        payload = _ref5$payload === undefined ? {} : _ref5$payload;

    state.ui = (0, _lodash.merge)(state.ui, payload);
  }), _defineProperty(_ref8, ASSIGN_UI, function (state, _ref6) {
    var _ref6$payload = _ref6.payload,
        payload = _ref6$payload === undefined ? {} : _ref6$payload;

    state.ui = Object.assign(state.ui, payload);
  }), _defineProperty(_ref8, RESET_UI, function (state, _ref7) {
    var _ref7$payload = _ref7.payload,
        payload = _ref7$payload === undefined ? {} : _ref7$payload;

    state.ui = payload;
  }), _ref8;
};
/* eslint no-param-reassign: "error" */