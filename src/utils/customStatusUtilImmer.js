export const status = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const isInit = state => state.status === status.INIT;
export const isLoading = state => state.status === status.LOADING;
export const isSuccess = state => state.status === status.SUCCESS;
export const isFailed = state => state.status === status.FAILED;
