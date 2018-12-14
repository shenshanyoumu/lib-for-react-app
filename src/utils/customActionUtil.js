import getTimestamp from './getTimestamp';

export function customShowLoading(type) {
  return {
    type,
    meta: {
      customLoading: true,
    },
  };
}

export function customTimestampMeta(meta = {}) {
  return {
    ...meta,
    ignoreSystemLoading: true,
    ignoreCustomLoading: false,
    timestamp: getTimestamp(),
  };
}

export function customAsyncWrapper({
  type,
  payload: { api, extraActions },
  meta,
}) {
  return dispatch => {
    dispatch(customShowLoading(type));

    if (extraActions && extraActions.length > 0) {
      extraActions.forEach(action => dispatch(action));
    }

    return dispatch({
      type,
      payload: api,
      meta: {
        ...customTimestampMeta(meta),
        ignoreCustomLoading: true,
      },
    });
  };
}
