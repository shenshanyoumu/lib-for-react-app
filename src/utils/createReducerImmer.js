import produce from 'immer';

/* eslint no-param-reassign: "off" */
export default (initialState, handlers) => {
  if (!initialState || !handlers) {
    throw new Error(
      'must pass args of "initialState" and "handlers" to createReducer!'
    );
  }

  return produce((draft, { type, ...params }) => {
    const action = handlers[type];
    return action && action(draft, params);
  }, initialState);
};
