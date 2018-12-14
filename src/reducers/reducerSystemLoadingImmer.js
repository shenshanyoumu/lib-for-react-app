import {
  SYSTEM_SHOW_LOADING,
  SYSTEM_HIDE_LOADING,
} from '../actions/systemLoading';
import createReducer from '../utils/createReducer';

const initialState = {
  display: false,
  text: '',
};
/* eslint no-param-reassign: "off" */
const handlers = {
  [SYSTEM_SHOW_LOADING](state, { payload: { text = '' } = {} }) {
    state.display = true;
    state.text = text;
  },

  [SYSTEM_HIDE_LOADING](state) {
    state.display = false;
    state.text = '';
  },
};
/* eslint no-param-reassign: "error" */
export default createReducer(initialState, handlers);
