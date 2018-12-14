export const status = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const isInit = state => state.get('status') === status.INIT;
export const isLoading = state => state.get('status') === status.LOADING;
export const isSuccess = state => state.get('status') === status.SUCCESS;
export const isFailed = state => state.get('status') === status.FAILED;
