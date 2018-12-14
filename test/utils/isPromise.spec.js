import isPromise from 'utils/isPromise';

describe('utils/isPromise', () => {
  it('should return false, if args is null', () => {
    expect(isPromise(null)).toBeFalsy();
  });

  it('should return false, if args is not an object', () => {
    expect(isPromise([])).toBeFalsy();
  });

  it('should return true, if args is a thenable object', () => {
    const thenable = {
      then: () => true,
    };
    expect(isPromise(thenable)).toBeTruthy();
  });

  it('should return true, if args is a promise', () => {
    const promise = new Promise(() => {});
    expect(isPromise(promise)).toBeTruthy();
  });
});
