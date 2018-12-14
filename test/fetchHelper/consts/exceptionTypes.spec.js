import * as ExceptionTypes from 'fetchHelper/consts/exceptionTypes';

describe('fetchHelper/consts/exceptionTypes', () => {
  it('ExceptionTypes should has 2 members', () => {
    expect(ExceptionTypes).toEqual({
      HTTP: 'http error',
      SERVICE: 'services error',
    });
  });
});
