import createReducer from 'utils/createReducer';

describe('utils/createReducer', () => {
  let initialState;
  let handlers;
  const setup = () => {
    initialState = {
      list: [],
    };

    handlers = {
      GET_LIST: (state, { payload }) =>
        Object.assign({}, state, {
          list: payload.value,
        }),

      CLEAN_LIST: state =>
        Object.assign({}, state, {
          list: [],
        }),
    };
  };

  describe('check args of createReducer', () => {
    beforeEach(() => {
      setup();
    });

    it('throw appException, when pass zero args', () => {
      expect(() => {
        createReducer();
      }).toThrow();
    });

    it('throw appException, when only pass "initialState"', () => {
      expect(() => {
        createReducer(initialState);
      }).toThrow();
    });

    it('throw appException, when both "initialState" and "handlers" are null', () => {
      expect(() => {
        createReducer(null, null);
      }).toThrow();
    });

    it('throw appException, when "initialState" is null, "handlers" is correct', () => {
      expect(() => {
        createReducer(null, handlers);
      }).toThrow();
    });

    it('createReducer should return a function', () => {
      expect(createReducer(initialState, handlers)).toBeInstanceOf(Function);
    });
  });

  describe('check reducer function returned by run createReducer', () => {
    let reducer = null;

    beforeEach(() => {
      setup();
      reducer = createReducer(initialState, handlers);
    });

    it('reducer should return original state, when no action args', () => {
      const state = reducer();
      expect(state).toEqual(initialState);
    });

    it('reducer should return original state, when "action" does not has "type"', () => {
      const state = reducer(initialState, { payload: { value: [] } });
      expect(state).toEqual(initialState);
    });

    it('reducer should return new state, when pass correct action', () => {
      const action = {
        type: 'GET_LIST',
        payload: { value: [1, 2] },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        list: [1, 2],
      });
    });

    it('reducer should clean state, when pass clean action', () => {
      const newInitialState = {
        list: [1, 2],
      };
      const action = {
        type: 'CLEAN_LIST',
      };
      const state = reducer(newInitialState, action);
      expect(state).toEqual({
        list: [],
      });
    });

    it('reducer should return original state, when no associate "type" in "handlers"', () => {
      const action = {
        type: 'NO_HANDLERS',
      };
      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
