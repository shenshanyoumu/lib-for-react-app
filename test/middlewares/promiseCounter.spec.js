import promiseCounter from 'middlewares/promiseCounter';

describe('middlewares/promiseCounter', () => {
  beforeEach(() => {
    promiseCounter.count = 0;
  });

  it('promiseCounter should be a function, has one static property and four static functions', () => {
    expect(promiseCounter).toBeInstanceOf(Function);
    expect(promiseCounter.count).toBe(0);
    expect(promiseCounter.countUp).toBeInstanceOf(Function);
    expect(promiseCounter.countDown).toBeInstanceOf(Function);
    expect(promiseCounter.reset).toBeInstanceOf(Function);
    expect(promiseCounter.isEmpty).toBeInstanceOf(Function);
  });

  it('promiseCounter.countUp should increase promiseCounter.count', () => {
    expect(promiseCounter.count).toBe(0);
    promiseCounter.countUp();
    expect(promiseCounter.count).toBe(1);
    promiseCounter.countUp();
    expect(promiseCounter.count).toBe(2);
  });

  it("promiseCounter.countDown should decrease promiseCounter.count, but promiseCounter.count can't less then 0", () => {
    promiseCounter.count = 1;
    promiseCounter.countDown();
    expect(promiseCounter.count).toBe(0);
    promiseCounter.countDown();
    expect(promiseCounter.count).toBe(0);
  });

  it('promiseCounter.reset should reset promiseCounter.count as 0', () => {
    promiseCounter.count = 1;
    promiseCounter.reset();
    expect(promiseCounter.count).toBe(0);
  });

  it('promiseCounter.isEmpty should return true, if promiseCounter.count is 0', () => {
    expect(promiseCounter.isEmpty()).toBeTruthy();
  });

  it('promiseCounter.isEmpty should return false, if promiseCounter.count is not 0', () => {
    promiseCounter.count = 1;
    expect(promiseCounter.isEmpty()).toBeFalsy();
  });
});
