import fetchMock from 'fetch-mock';
import createAPI from 'utils/createAPI';
import FetchRequest from 'fetchHelper/fetchRequest';

describe('utils/createAPI', () => {
  let api = null;
  const path = 'http://test.com/async-api';
  const pathReg = /async-api/;
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
    api = createAPI(FetchRequest);
  });

  afterEach(() => {
    fetchMock.restore();
    api = null;
  });

  it('createAPI.get should works fine', async () => {
    fetchMock.get(pathReg, response);

    expect(api.get).toBeInstanceOf(Function);

    await api
      .get(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toMatch(
      'http://test.com/async-api?title=1&_timestamp='
    );
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'get',
      mode: 'cors',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.get should works fine, when overwrite options', async () => {
    fetchMock.get(pathReg, response);

    expect(api.get).toBeInstanceOf(Function);

    await api
      .get(
        path,
        { title: 1 },
        {
          credentials: 'none',
          headers: {
            custom: 'test',
          },
        }
      )
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'none',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        custom: 'test',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'get',
      mode: 'cors',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.delete should works fine', async () => {
    fetchMock.delete(pathReg, response);

    expect(api.delete).toBeInstanceOf(Function);

    await api
      .delete(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toMatch(
      'http://test.com/async-api?title=1&_timestamp='
    );
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'delete',
      mode: 'cors',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.post should works fine', async () => {
    fetchMock.post(pathReg, response);

    expect(api.post).toBeInstanceOf(Function);

    await api
      .post(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toBe('http://test.com/async-api');
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'post',
      mode: 'cors',
      body: '{"title":1}',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('set params as FormData for createAPI.post, headers["Content-Type"] should be deleted', async () => {
    fetchMock.post(pathReg, response);

    expect(api.post).toBeInstanceOf(Function);

    await api
      .post(path, new FormData())
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toBe('http://test.com/async-api');
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'post',
      mode: 'cors',
      body: new FormData(),
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.put should works fine', async () => {
    fetchMock.put(pathReg, response);

    expect(api.put).toBeInstanceOf(Function);

    await api
      .put(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toBe('http://test.com/async-api');
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'put',
      mode: 'cors',
      body: '{"title":1}',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.patch should works fine', async () => {
    fetchMock.patch(pathReg, response);

    expect(api.patch).toBeInstanceOf(Function);

    await api
      .patch(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toBe('http://test.com/async-api');
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'patch',
      mode: 'cors',
      body: '{"title":1}',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });

  it('createAPI.head should works fine', async () => {
    fetchMock.head(pathReg, response);

    expect(api.head).toBeInstanceOf(Function);

    await api
      .head(path, { title: 1 })
      .then(res => {
        expect(res).toEqual(expectResponse);
      })
      .catch(err => {
        expect(err).toBeNull();
      });

    expect(fetchMock.lastUrl()).toBe('http://test.com/async-api');
    expect(fetchMock.lastOptions()).toEqual({
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'head',
      mode: 'cors',
      body: '{"title":1}',
    });
    expect(fetchMock.called(pathReg)).toBeTruthy();
  });
});
