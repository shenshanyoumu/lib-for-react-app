import isReactNative from 'utils/isReactNative';

describe('consts/isReactNative', () => {
  it('should be false', () => {
    expect(isReactNative()).toBeFalsy();
  });
});
