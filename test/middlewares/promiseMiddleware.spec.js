import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import promiseMiddleware from 'middlewares/promiseMiddleware';

const mockStore = configureMockStore([promiseMiddleware]);
let store;

describe('middlewares/promiseMiddleware', () => {
  const response = {
    body: {
      data: 'ok',
    },
  };

  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    store.clearActions();
    fetchMock.restore();
  });

  it('should not handle this action, if payload is empty', () => {
    const action = {
      type: 'PROMISE_ACTION',
    };

    store.dispatch(action);
    expect(store.getActions()).toEqual([action]);
  });

  it('should not handle this action, if payload is not a promise', () => {
    const action = {
      type: 'PROMISE_ACTION',
      payload: {},
    };

    store.dispatch(action);
    expect(store.getActions()).toEqual([action]);
  });

  it('should handle promise action correctly', async () => {
    fetchMock.get(/async-api/, response, 200);

    const action = {
      type: 'PROMISE_ACTION',
      payload: fetch('test.com/async-api'),
    };

    await store.dispatch(action);

    expect(fetchMock.called(/async-api/)).toBeTruthy();

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      payload: undefined,
      type: '@@system/SHOW_LOADING',
    });
    expect(actions[1].type).toEqual('PROMISE_ACTION');
  });

  it('should handle promise action correctly, when it has meta', () => {
    fetchMock.get(/async-api/, response, 200);

    const action = {
      type: 'PROMISE_ACTION',
      payload: fetch('test.com/async-api'),
      meta: {
        ignoreSystemLoading: true,
        handlers: {
          success: () => {},
          failed: () => {},
          finally: () => {},
        },
      },
    };

    return store.dispatch(action).then(() => {
      expect(fetchMock.called(/async-api/)).toBeTruthy();

      const actions = store.getActions();
      expect(actions[0].type).toEqual('PROMISE_ACTION');
    });
  });

  it('should works fine when promise throw error', () => {
    const error = new Error('fetch error');
    fetchMock.get(/async-api/, {
      throws: error,
    });

    const action = {
      type: 'PROMISE_ACTION',
      payload: fetch('test.com/async-api'),
      meta: {
        handlers: {
          success: () => {},
          failed: () => {},
          finally: () => {},
        },
      },
    };

    return store.dispatch(action).catch(() => {
      expect(fetchMock.called(/async-api/)).toBeTruthy();

      const actions = store.getActions();
      expect(actions[0].type).toBe('PROMISE_ACTION');
      expect(actions[0].payload).toEqual(error);
      expect(actions[0].error).toBe(true);
    });
  });
});
