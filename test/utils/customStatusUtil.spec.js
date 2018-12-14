import { fromJS } from 'immutable';
import {
  status as _status,
  isInit,
  isLoading,
  isSuccess,
  isFailed,
} from 'utils/customStatusUtil';

describe('utils/customStatusUtil', () => {
  it('status should be an object', () => {
    expect(_status).toEqual({
      INIT: 'init',
      LOADING: 'loading',
      SUCCESS: 'success',
      FAILED: 'failed',
    });
  });

  it('isInit should works fine', () => {
    const initState = fromJS({
      status: _status.INIT,
    });

    expect(isInit(initState)).toBeTruthy();
  });

  it('isLoading should works fine', () => {
    const initState = fromJS({
      status: _status.LOADING,
    });

    expect(isLoading(initState)).toBeTruthy();
  });

  it('isSuccess should works fine', () => {
    const initState = fromJS({
      status: _status.SUCCESS,
    });

    expect(isSuccess(initState)).toBeTruthy();
  });

  it('isFailed should works fine', () => {
    const initState = fromJS({
      status: _status.FAILED,
    });

    expect(isFailed(initState)).toBeTruthy();
  });
});
