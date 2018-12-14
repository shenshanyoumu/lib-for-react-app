import {
  SYSTEM_REPORT_ERROR,
  SYSTEM_CLEAN_ERROR,
} from '../actions/systemError';
import createReducer from '../utils/createReducer';

const initialState = {
  title: null,
  type: null,
  messages: [],
};

/* eslint no-param-reassign: "off" */
const handlers = {
  [SYSTEM_REPORT_ERROR](
    state,
    {
      payload: { title, type, messages },
    }
  ) {
    state.title = title;
    state.type = type;
    state.messages = messages;
  },

  [SYSTEM_CLEAN_ERROR](state) {
    state.title = null;
    state.type = null;
    state.messages = [];
  },
};
/* eslint no-param-reassign: "error" */
export default createReducer(initialState, handlers);
