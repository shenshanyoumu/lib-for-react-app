import utils from 'utils/index';

describe('utils/index', () => {
  it('asyncComponent should export correct', () => {
    expect(utils.asyncComponent).toBeInstanceOf(Function);
  });

  it('camelCaseKeys should export correct', () => {
    expect(utils.camelCaseKeys).toBeInstanceOf(Function);
  });

  it('createAPI should export correct', () => {
    expect(utils.createAPI).toBeInstanceOf(Function);
  });

  it('createReducer should export correct', () => {
    expect(utils.createReducer).toBeInstanceOf(Function);
  });

  it('customActionUtil should export correct', () => {
    const { customShowLoading, customTimestampMeta } = utils.customActionUtil;

    expect(customShowLoading).toBeInstanceOf(Function);
    expect(customTimestampMeta).toBeInstanceOf(Function);
  });

  it('customReducerUtil should export correct', () => {
    const { initCustomState, customResultParser } = utils.customReducerUtil;

    expect(initCustomState).toBeInstanceOf(Function);
    expect(customResultParser).toBeInstanceOf(Function);
  });

  it('customStatusUtil should export correct', () => {
    const {
      status,
      isInit,
      isLoading,
      isSuccess,
      isFailed,
    } = utils.customStatusUtil;

    expect(status).toBeInstanceOf(Object);
    expect(isInit).toBeInstanceOf(Function);
    expect(isLoading).toBeInstanceOf(Function);
    expect(isSuccess).toBeInstanceOf(Function);
    expect(isFailed).toBeInstanceOf(Function);
  });

  it('isPromise should export correct', () => {
    expect(utils.isPromise).toBeInstanceOf(Function);
  });

  it('isReactNative should export correct', () => {
    expect(utils.isReactNative).toBeInstanceOf(Function);
  });

  it('syncComponent should export correct', () => {
    expect(utils.syncComponent).toBeInstanceOf(Function);
  });

  it('toQueryString should export correct', () => {
    expect(utils.toQueryString).toBeInstanceOf(Function);
  });
});
