"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseCounter = function () {
  function PromiseCounter() {
    _classCallCheck(this, PromiseCounter);
  }

  _createClass(PromiseCounter, null, [{
    key: "countUp",
    value: function countUp() {
      PromiseCounter.count = Math.max(PromiseCounter.count + 1, 0);
    }
  }, {
    key: "countDown",
    value: function countDown() {
      PromiseCounter.count = Math.max(PromiseCounter.count - 1, 0);
    }
  }, {
    key: "reset",
    value: function reset() {
      PromiseCounter.count = 0;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return PromiseCounter.count === 0;
    }
  }]);

  return PromiseCounter;
}();

PromiseCounter.count = 0;
exports.default = PromiseCounter;