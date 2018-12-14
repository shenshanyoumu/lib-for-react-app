import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { getUIReducers, getUIActions } from './moduleUI';

import createReducer from './createReducer';

/* eslint no-param-reassign: "off" */
export default ({ namespace, state, reducers, actions = {}, thunks = {} }) => {
  if (
    !namespace ||
    !state ||
    !reducers ||
    (isEmpty(actions) && isEmpty(thunks))
  ) {
    throw new Error(
      'must pass args of "namespace, state, reducers, actions or thunks" to createModule!'
    );
  }
  const createActionType = type => `${namespace}/${type}`;

  const needInjectUI = Object.prototype.hasOwnProperty.call(state, 'ui');

  let allActions = {};
  let UIReducers = {};
  let UIActions = {};

  if (needInjectUI) {
    UIReducers = getUIReducers(namespace);
    UIActions = getUIActions(namespace);
  }

  const handlers = Object.entries(reducers).reduce((result, reducer) => {
    const type = createActionType(reducer[0]);
    result[type] = reducer[1];
    return result;
  }, UIReducers);

  const actionsWithNamespace = Object.entries(actions).reduce(
    (result, reducer) => {
      const type = createActionType(reducer[0]);
      result[reducer[0]] = (...args) => ({
        type,
        ...reducer[1](...args),
      });
      return result;
    },
    {}
  );

  const thunksWithNamespace = Object.entries(thunks).reduce(
    (result, reducer) => {
      const type = createActionType(reducer[0]);
      result[reducer[0]] = (...args) => (dispatch, getState, extraArgument) =>
        reducer[1](
          {
            namespace,
            dispatch,
            getState,
            extraArgument,
            type,
            createActionType,
            ...bindActionCreators(allActions, dispatch),
          },
          ...args
        );
      return result;
    },
    {}
  );

  allActions = {
    ...actionsWithNamespace,
    ...thunksWithNamespace,
    ...UIActions,
  };

  return {
    namespace,
    initialState: state,
    handlers,
    createActionType,
    actions: allActions,
    reducers: createReducer(state, handlers),
  };
};
/* eslint no-param-reassign: "error" */
