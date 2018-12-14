import { fromJS } from 'immutable';
import reducer from 'reducers/reducerSystemError';
import { SYSTEM_REPORT_ERROR, SYSTEM_CLEAN_ERROR } from 'actions/systemError';

const initialState = fromJS({
  title: null,
  type: null,
  messages: [],
});
const expectObj = {
  title: 'appException title',
  type: 'appException type',
  messages: ['appException message'],
};

describe('reducers/systemError', () => {
  test('SYSTEM_REPORT_ERROR should works fine', () => {
    const result = reducer(initialState, {
      type: SYSTEM_REPORT_ERROR,
      payload: {
        title: 'appException title',
        type: 'appException type',
        messages: ['appException message'],
      },
    });

    expect(result.toJS()).toEqual(expectObj);
  });

  test('SYSTEM_CLEAN_ERROR should works fine', () => {
    const result = reducer(fromJS(expectObj), {
      type: SYSTEM_CLEAN_ERROR,
    });

    expect(result.toJS()).toEqual({
      title: null,
      type: null,
      messages: [],
    });
  });
});
