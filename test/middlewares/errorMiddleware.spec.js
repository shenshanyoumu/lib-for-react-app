import configureMockStore from 'redux-mock-store';
import errorMiddleware from 'middlewares/errorMiddleware';
import * as ExceptionTypes from 'fetchHelper/consts/exceptionTypes';
import FetchException from 'fetchHelper/fetchException';

const mockStore = configureMockStore([errorMiddleware]);
let store;

describe('middlewares/errorMiddleware', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    store.clearActions();
    errorMiddleware.isConsole = false;
  });

  it('should not handle this action, if not has appException property', () => {
    const action = {
      type: 'ERROR_ACTION',
    };

    store.dispatch(action);
    expect(store.getActions()).toEqual([action]);
  });

  it('should handle ExceptionTypes.HTTP action correctly', () => {
    const error = new FetchException(
      'http exception message',
      ExceptionTypes.HTTP
    );
    const action = {
      type: 'ERROR_ACTION',
      payload: error,
      error: true,
    };
    const expectedAction = [
      {
        type: '@@system/REPORT_ERROR',
        payload: {
          messages: [
            '请检查网络连接',
            '状态码: undefined',
            '状态信息: http exception message',
          ],
          title: '网络异常',
          type: 'http error',
        },
      },
      {
        type: 'ERROR_ACTION',
        payload: error,
        error: true,
      },
    ];

    store.dispatch(action);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should handle ExceptionTypes.HTTP action correctly', () => {
    const error = new FetchException(
      'http exception message',
      ExceptionTypes.HTTP,
      {
        code: 500,
      }
    );
    const action = {
      type: 'ERROR_ACTION',
      payload: error,
      error: true,
    };
    const expectedAction = [
      {
        type: '@@system/REPORT_ERROR',
        payload: {
          messages: [
            '请检查网络连接',
            '状态码: 500',
            '状态信息: http exception message',
          ],
          title: '网络异常',
          type: 'http error',
        },
      },
      {
        type: 'ERROR_ACTION',
        payload: error,
        error: true,
      },
    ];

    store.dispatch(action);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should handle ExceptionTypes.SERVICE action correctly', () => {
    const error = new FetchException(
      'service exception message',
      ExceptionTypes.SERVICE,
      {
        url: 'test-url.com',
        code: 500,
      }
    );
    const action = {
      type: 'ERROR_ACTION',
      payload: error,
      error: true,
    };
    const expectedAction = [
      {
        type: '@@system/REPORT_ERROR',
        payload: {
          title: '服务异常',
          messages: [
            '访问 test-url.com 出错',
            '请刷新页面重试',
            '返回码: 500',
            '返回信息: service exception message',
          ],
          type: 'services error',
        },
      },
      {
        type: 'ERROR_ACTION',
        payload: error,
        error: true,
      },
    ];

    store.dispatch(action);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should handle Error action correctly', () => {
    const error = new Error('error message');
    const action = {
      type: 'ERROR_ACTION',
      payload: error,
      error: true,
    };
    const expectedAction = [
      {
        type: '@@system/REPORT_ERROR',
        payload: {
          messages: ['error message'],
          title: '异常',
        },
      },
      {
        type: 'ERROR_ACTION',
        payload: error,
        error: true,
      },
    ];

    store.dispatch(action);
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should run console.error, if errorMiddleware.isConsole is "true"', () => {
    const error = new Error('error message');
    const action = {
      type: 'ERROR_ACTION',
      payload: error,
      error: true,
    };

    global.console = {
      error: jest.fn(),
    };

    errorMiddleware.isConsole = true;

    store.dispatch(action);
    expect(console.error).toBeCalled();
    expect(console.error).toBeCalledWith(error);
  });
});
