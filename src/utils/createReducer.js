import produce from 'immer';
import Immutable from 'immutable';

/* eslint no-param-reassign: "off" */
export default (initialState, handlers) => {
  if (!initialState || !handlers) {
    throw new Error(
      'must pass args of "initialState" and "handlers" to createReducer!'
    );
  }

  const isImmutable = Immutable.Iterable.isIterable(initialState);

  const immutableReducer = (state = initialState, { type, ...params } = {}) => {
    const action = handlers[type];
    return action ? action(state, { type, ...params }) : state;
  };

  const immerReducer = produce((draft, { type, ...params } = {}) => {
    const action = handlers[type];
    return action && action(draft, { type, ...params });
  }, initialState);

  return isImmutable ? immutableReducer : immerReducer;
};
