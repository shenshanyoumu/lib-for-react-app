import fetchMock from 'fetch-mock';
import * as ExceptionTypes from 'fetchHelper/consts/exceptionTypes';
import FetchRequest from 'fetchHelper/fetchRequest';
import FetchException from 'fetchHelper/fetchException';

describe('fetchHelper/FetchRequest', () => {
  it('dispatch unhandledrejection event', () => {
    window.dispatchEvent(new CustomEvent('unhandledrejection'));
  });

  describe('FetchRequest should work fine', () => {
    it('dispatch should be null', () => {
      expect(FetchRequest.dispatch).toBeNull();
    });

    it('connectToRedux should change FetchRequest.dispatch', () => {
      const { connectToRedux } = FetchRequest;
      const store = {
        dispatch: () => 'connectToRedux updated!',
      };

      connectToRedux(store);
      expect(FetchRequest.dispatch()).toBe('connectToRedux updated!');
    });

    it('preHandleResponse should returns false', () => {
      expect(FetchRequest.preHandleResponse()).toBeFalsy();
    });

    it('preHandleResponse should change the static functions of FetchRequest', () => {
      FetchRequest.preHandleResponse = () => true;
      expect(FetchRequest.preHandleResponse()).toBeTruthy();
    });
  });

  describe('FetchRequest fetch functions should works fine', () => {
    const path = 'http://test.com/test_url';
    const pathReg = /test_url/;
    const response = {
      body: {
        header: {
          code: 0,
          message: '',
        },
        body: {},
      },
    };
    const expectResponse = {
      body: {},
      code: 0,
      header: {
        code: 0,
        message: '',
      },
      message: '',
      success: true,
    };

    beforeEach(() => {
      FetchRequest.dispatch = null;
      FetchRequest.preHandleResponse = () => false;

      fetchMock.restore();
    });

    it('set options.ajaxCache as "true", url should include "_timestamp"', async () => {
      const pathRegex = /test_url\?key=val&_timestamp=\d+$/;
      fetchMock.get(pathRegex, response);

      await FetchRequest.get(path, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: {
          key: 'val',
        },
        ajaxCache: true,
      });

      expect(fetchMock.called(pathRegex)).toBeTruthy();
    });

    it('set options.ajaxCache as "false", url should not include "_timestamp"', async () => {
      fetchMock.get(pathReg, response);

      await FetchRequest.get(path, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        ajaxCache: false,
      })
        .then(res => {
          expect(res).toEqual(expectResponse);
        })
        .catch(err => {
          expect(err).toBeNull();
        });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('should throw error, if FetchRequest.preHandleResponse return not false value', async () => {
      fetchMock.get(pathReg, response);

      FetchRequest.preHandleResponse = () => new Error('error');

      await FetchRequest.get(path, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }).catch(err => {
        expect(err).toEqual(new Error('error'));
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('post function should works fine', async () => {
      fetchMock.post(pathReg, response);
      fetchMock.post(pathReg, response);
      const formData = new FormData();
      formData.append('test', 'test');
      await FetchRequest.post(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          key: 'val',
        },
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });

      await FetchRequest.post(path, {
        body: formData,
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });
      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('put function should works fine', async () => {
      fetchMock.put(pathReg, response);

      await FetchRequest.put(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          key: 'val',
        },
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('patch function should works fine', async () => {
      fetchMock.patch(pathReg, response);

      await FetchRequest.patch(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          key: 'val',
        },
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('delete function should works fine', async () => {
      fetchMock.delete(pathReg, response);

      await FetchRequest.delete(path, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: {
          key: 'val',
        },
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('head function should works fine', async () => {
      fetchMock.head(pathReg, response);

      await FetchRequest.head(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          key: 'val',
        },
      }).then(res => {
        expect(res).toEqual(expectResponse);
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('should handle error correctly, when 500 error', async () => {
      const errResponse = new Response(
        {},
        {
          status: 500,
          statusText: 'fetch error',
        }
      );
      fetchMock.get(pathReg, errResponse);
      const expectError = new Error(
        JSON.stringify({
          status: 500,
          statusText: 'fetch error',
          headers: { _headers: {} },
          body: {},
        })
      );

      await FetchRequest.get(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        ajaxCache: false,
      }).catch(err => {
        expect(err).toEqual(expectError);
      });

      expect(fetchMock.called(pathReg)).toBeTruthy();
    });

    it('should handle error correctly, when response is not success', async () => {
      fetchMock.get(pathReg, {
        body: {
          header: {
            code: 1,
            message: 'fetch error',
          },
          body: {},
        },
      });
      const expectError = new FetchException(
        'fetch error',
        ExceptionTypes.SERVICE,
        {
          code: 1,
          url: path,
          res: {
            body: {},
            code: 1,
            header: {
              code: 1,
              message: 'fetch error',
            },
            message: 'fetch error',
            success: false,
          },
        }
      );
      let expectDispatched = false;

      const store = {
        dispatch: () => {
          expectDispatched = true;
        },
      };

      FetchRequest.connectToRedux(store);

      await FetchRequest.get(path, {
        headers: {
          'Content-Type': 'application/json',
        },
        ajaxCache: false,
      }).catch(err => {
        expect(err).toEqual(expectError);
      });

      console.log(fetchMock.calls());

      expect(expectDispatched).toBeTruthy();
      expect(fetchMock.called(pathReg)).toBeTruthy();
    });
  });
});
