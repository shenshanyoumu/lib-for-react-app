export default class PromiseCounter {
  static count = 0;

  static countUp() {
    PromiseCounter.count = Math.max(PromiseCounter.count + 1, 0);
  }

  static countDown() {
    PromiseCounter.count = Math.max(PromiseCounter.count - 1, 0);
  }

  static reset() {
    PromiseCounter.count = 0;
  }

  static isEmpty() {
    return PromiseCounter.count === 0;
  }
}
