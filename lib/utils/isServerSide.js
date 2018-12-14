'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isServerSide;
function isServerSide() {
  return typeof global !== 'undefined' && !global.window;
}