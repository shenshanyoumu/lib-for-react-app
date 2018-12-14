import { fromJS } from 'immutable';
import * as customReducerUtil from 'utils/customReducerUtil';
import { status as _status } from 'utils/customStatusUtil';

describe('utils/customReducerUtil', () => {
  it('initCustomState should works fine, if no param', () => {
    const { initCustomState } = customReducerUtil;
    const state = initCustomState();

    expect(state).toEqual({
      status: _status.INIT,
      message: '',
      timestamp: null,
      data: {},
    });
  });

  it('initCustomState should works fine, if input param', () => {
    const { initCustomState } = customReducerUtil;
    const state = initCustomState({ list: [1, 2, 3] });

    expect(state).toEqual({
      status: _status.INIT,
      message: '',
      timestamp: null,
      data: {
        list: [1, 2, 3],
      },
    });
  });

  describe('getRequestTimestamp should works fine', () => {
    const { getRequestTimestamp } = customReducerUtil;
    const initState = fromJS({
      timestamp: null,
    });

    it('if no timestamp in meta, return a new value', () => {
      const meta = {};
      const result = getRequestTimestamp(initState, meta);

      expect(result.toString()).toMatch(/\d{13}/);
    });

    it('if timestamp in state is bigger than timestamp in meta, return null', () => {
      const newInitState = fromJS({
        timestamp: 1501219814794,
      });
      const meta = {
        timestamp: 1501219801971,
      };
      const result = getRequestTimestamp(newInitState, meta);

      expect(result).toBeNull();
    });

    it('if timestamp in state is null, return the value of timestamp in meta', () => {
      const newInitState = fromJS({
        timestamp: null,
      });
      const meta = {
        timestamp: 1501219801971,
      };
      const result = getRequestTimestamp(newInitState, meta);

      expect(result).toBe(1501219801971);
    });

    it('if timestamp in state is less than timestamp in meta, return the value of timestamp in meta', () => {
      const newInitState = fromJS({
        timestamp: 1501219801971,
      });
      const meta = {
        timestamp: 1501219814794,
      };
      const result = getRequestTimestamp(newInitState, meta);

      expect(result).toBe(1501219814794);
    });
  });

  describe('customResultParser should works fine', () => {
    const { customResultParser } = customReducerUtil;
    const initState = fromJS({
      status: _status.INIT,
      message: '',
      timestamp: null,
      data: {},
    });

    it('should return prev state, if timestamp in state is bigger than timestamp in meta', () => {
      const newInitState = fromJS({
        status: _status.SUCCESS,
        message: '',
        timestamp: 1501219814794,
        data: {},
      });
      const meta = {
        timestamp: 1501219801971,
      };
      const error = false;
      const payload = {};
      const result = customResultParser(newInitState, { meta, error, payload });

      expect(result.toJS()).toEqual({
        status: _status.SUCCESS,
        message: '',
        timestamp: 1501219814794,
        data: {},
      });
    });

    it('if customLoading is true', () => {
      const meta = {
        timestamp: 1501219814794,
        customLoading: true,
      };
      const error = false;
      const payload = {};
      const result = customResultParser(initState, { meta, error, payload });

      expect(result.toJS()).toEqual({
        status: _status.LOADING,
        message: '',
        timestamp: 1501219814794,
        data: {},
      });
    });

    it('if error is true', () => {
      const meta = {
        timestamp: 1501219814794,
      };
      const error = true;
      const payload = {
        message: 'error message',
      };
      const result = customResultParser(initState, { meta, error, payload });

      expect(result.toJS()).toEqual({
        status: _status.FAILED,
        message: 'error message',
        timestamp: 1501219814794,
        data: {},
      });
    });

    it('no parseData function', () => {
      const meta = {
        timestamp: 1501219814794,
      };
      const error = false;
      const payload = {
        body: {
          key: 'val',
        },
      };
      const result = customResultParser(initState, { meta, error, payload });

      expect(result.toJS()).toEqual({
        status: _status.SUCCESS,
        message: '',
        timestamp: 1501219814794,
        data: {
          key: 'val',
        },
      });
    });

    it('supply parseData function', () => {
      const meta = {
        timestamp: 1501219814794,
      };
      const error = false;
      const payload = {
        body: {
          currentPage: 1,
          totalCount: 30,
          list: [1, 2, 3],
        },
      };
      const parseData = (state, data) => {
        state.setIn(['data', 'pageInfo', 'currentPage'], data.currentPage);
        state.setIn(['data', 'pageInfo', 'totalCount'], data.totalCount);
        state.setIn(['data', 'list'], fromJS(data.list));
      };
      const result = customResultParser(
        initState,
        { meta, error, payload },
        parseData
      );

      expect(result.toJS()).toEqual({
        status: _status.SUCCESS,
        message: '',
        timestamp: 1501219814794,
        data: {
          pageInfo: {
            currentPage: 1,
            totalCount: 30,
          },
          list: [1, 2, 3],
        },
      });
    });
  });
});
