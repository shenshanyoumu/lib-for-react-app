import {
  BaseComponent,
  withIntl,
  Actions,
  Reducers,
  Utils,
  Middlewares,
  FetchHelper,
} from '../src/index';
import testHelper from '../src/testHelper';

describe('index', () => {
  it('BaseComponent should be a function', () => {
    expect(BaseComponent).toBeInstanceOf(Function);
  });

  it('withIntl should be a function', () => {
    expect(withIntl).toBeInstanceOf(Function);
  });

  it('Actions should be an object', () => {
    expect(Actions).toBeInstanceOf(Object);

    expect(Actions.systemReportError).toBeInstanceOf(Function);
    expect(Actions.systemCleanError).toBeInstanceOf(Function);
  });

  it('Reducers should be an object', () => {
    expect(Reducers).toBeInstanceOf(Object);

    expect(Reducers.systemError).toBeInstanceOf(Function);
    expect(Reducers.systemLoading).toBeInstanceOf(Function);
  });

  it('Utils should be an object', () => {
    expect(Utils).toBeInstanceOf(Object);

    const { isPromise, createReducer } = Utils;

    expect(isPromise).toBeInstanceOf(Function);
    expect(createReducer).toBeInstanceOf(Function);
  });

  it('Middlewares should be an object', () => {
    expect(Middlewares).toBeInstanceOf(Object);

    const { promiseMiddleware, thunkMiddleware, middlewares } = Middlewares;
    expect(promiseMiddleware).toBeInstanceOf(Function);
    expect(thunkMiddleware).toBeInstanceOf(Function);
    expect(middlewares).toBeInstanceOf(Array);
  });

  it('FetchHelper should be an object', () => {
    expect(FetchHelper).toBeInstanceOf(Object);
  });

  it('testHelper should be an object', () => {
    expect(testHelper).toBeInstanceOf(Object);
  });
});
