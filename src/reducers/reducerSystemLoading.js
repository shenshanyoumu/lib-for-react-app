import { fromJS } from 'immutable';
import {
  SYSTEM_SHOW_LOADING,
  SYSTEM_HIDE_LOADING,
} from '../actions/systemLoading';
import createReducer from '../utils/createReducer';

const initialState = fromJS({
  display: false,
  text: '',
});

const handlers = {
  [SYSTEM_SHOW_LOADING](state, { payload = { text: '' } }) {
    const { text } = payload;

    return state.withMutations(s => {
      s.set('display', true);
      s.set('text', text);
    });
  },

  [SYSTEM_HIDE_LOADING](state) {
    return state.withMutations(s => {
      s.set('display', false);
      s.set('text', '');
    });
  },
};

export default createReducer(initialState, handlers);
