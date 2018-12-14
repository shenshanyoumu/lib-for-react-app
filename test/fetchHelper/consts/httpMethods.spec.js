import * as HttpMethods from 'fetchHelper/consts/httpMethods.js';

describe('fetchHelper/consts/HttpMethods', () => {
  it('HttpMethods should has 6 members', () => {
    expect(HttpMethods).toEqual({
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      PATCH: 'patch',
      DELETE: 'delete',
      HEAD: 'head',
    });
  });
});
