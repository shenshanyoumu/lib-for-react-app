import { fromJS } from 'immutable';
import {
  SYSTEM_REPORT_ERROR,
  SYSTEM_CLEAN_ERROR,
} from '../actions/systemError';
import createReducer from '../utils/createReducer';

const initialState = fromJS({
  title: null,
  type: null,
  messages: [],
});

const handlers = {
  [SYSTEM_REPORT_ERROR](state, { payload }) {
    const { title, type, messages } = payload;

    return state.withMutations(s => {
      s.set('title', title);
      s.set('type', type);
      s.set('messages', messages);
    });
  },

  [SYSTEM_CLEAN_ERROR](state) {
    return state.withMutations(s => {
      s.set('title', null);
      s.set('type', null);
      s.set('messages', []);
    });
  },
};

export default createReducer(initialState, handlers);
