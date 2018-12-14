import { fromJS } from 'immutable';
import reducer from 'reducers/reducerSystemLoading';
import {
  SYSTEM_SHOW_LOADING,
  SYSTEM_HIDE_LOADING,
} from 'actions/systemLoading';

const initialState = fromJS({
  display: false,
  text: '',
});
const expectObj = {
  display: true,
  text: 'loading message',
};

describe('reducers/systemLoading', () => {
  test('SYSTEM_SHOW_LOADING should works fine', () => {
    const result = reducer(initialState, {
      type: SYSTEM_SHOW_LOADING,
      payload: {
        text: 'loading message',
      },
    });

    expect(result.toJS()).toEqual(expectObj);
  });

  test('SYSTEM_HIDE_LOADING should works fine', () => {
    const result = reducer(fromJS(expectObj), {
      type: SYSTEM_HIDE_LOADING,
    });

    expect(result.toJS()).toEqual({
      display: false,
      text: '',
    });
  });
});
