'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBrowserSide;
function isBrowserSide() {
  return typeof window !== 'undefined' && window.location;
}