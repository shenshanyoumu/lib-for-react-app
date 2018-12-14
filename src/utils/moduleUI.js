import { merge } from 'lodash';

export const getUITypes = namespace => ({
  MERGE_UI: `${namespace}/MERGE_UI`,
  ASSIGN_UI: `${namespace}/ASSIGN_UI`,
  RESET_UI: `${namespace}/RESET_UI`,
});

export const getUIActions = namespace => {
  const { MERGE_UI, ASSIGN_UI, RESET_UI } = getUITypes(namespace);
  return {
    mergeUI(payload) {
      return {
        type: MERGE_UI,
        payload,
      };
    },
    assignUI(payload) {
      return {
        type: ASSIGN_UI,
        payload,
      };
    },
    resetUI(payload) {
      return {
        type: RESET_UI,
        payload,
      };
    },
  };
};

export const getUIReducers = namespace => {
  const { MERGE_UI, ASSIGN_UI, RESET_UI } = getUITypes(namespace);
  return {
    [MERGE_UI](state, { payload = {} }) {
      return state.update('ui', ui => ui.mergeDeep(payload));
    },
    [ASSIGN_UI](state, { payload = {} }) {
      return state.update('ui', ui => ui.merge(payload));
    },
    [RESET_UI](state, { payload = {} }) {
      return state.set('ui', payload);
    },
  };
};

/* eslint no-param-reassign: "off" */
export const getUIReducersImmer = namespace => {
  const { MERGE_UI, ASSIGN_UI, RESET_UI } = getUITypes(namespace);
  return {
    [MERGE_UI](state, { payload = {} }) {
      state.ui = merge(state.ui, payload);
    },
    [ASSIGN_UI](state, { payload = {} }) {
      state.ui = Object.assign(state.ui, payload);
    },
    [RESET_UI](state, { payload = {} }) {
      state.ui = payload;
    },
  };
};
/* eslint no-param-reassign: "error" */
