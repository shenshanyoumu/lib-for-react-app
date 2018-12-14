import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import * as customActionUtil from 'utils/customActionUtil';
import Middleware from 'middlewares/index';

const mockStore = configureMockStore(Middleware.middlewares);
let store;

describe('utils/customActionUtil', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    store.clearActions();
    fetchMock.restore();
  });

  it('customShowLoading should works fine', () => {
    const { customShowLoading } = customActionUtil;
    const result = customShowLoading('CUSTOM_ACTION');

    expect(result).toEqual({
      type: 'CUSTOM_ACTION',
      meta: {
        customLoading: true,
      },
    });
  });

  it('customTimestampMeta should works fine', () => {
    const { customTimestampMeta } = customActionUtil;
    const result = customTimestampMeta({ customMeta: 1 });

    expect(result.customMeta).toBe(1);
    expect(result.ignoreSystemLoading).toBeTruthy();
    expect(result.timestamp.toString()).toMatch(/\d{13}/);
  });

  it('customAsyncWrapper should works fine', async () => {
    fetchMock.get(
      /async-api/,
      {
        body: {
          data: 'ok',
        },
      },
      200
    );

    const { customAsyncWrapper } = customActionUtil;
    const action = customAsyncWrapper({
      type: 'CUSTOM_ASYNC_ACTION',
      payload: {
        api: fetch('test.com/async-api'),
        extraActions: [
          {
            type: 'EXTRA_ACTION1',
          },
          {
            type: 'EXTRA_ACTION2',
          },
        ],
      },
      meta: {
        handlers: {
          success: () => {},
          failed: () => {},
        },
      },
    });

    await store.dispatch(action);

    expect(fetchMock.called(/async-api/)).toBeTruthy();

    const actions = store.getActions();

    expect(actions).toHaveLength(4);
    expect(actions[0]).toEqual({
      type: 'CUSTOM_ASYNC_ACTION',
      meta: { customLoading: true },
    });
    expect(actions[1]).toEqual({ type: 'EXTRA_ACTION1' });
    expect(actions[2]).toEqual({ type: 'EXTRA_ACTION2' });

    const action4 = actions[3];
    expect(action4.type).toEqual('CUSTOM_ASYNC_ACTION');
    expect(action4.payload).toBeInstanceOf(Object);
    expect(action4.meta.handlers.success).toBeInstanceOf(Function);
    expect(action4.meta.handlers.failed).toBeInstanceOf(Function);
    expect(action4.meta.ignoreSystemLoading).toBeTruthy();
    expect(action4.meta.timestamp.toString()).toMatch(/\d{13}/);
  });
});
