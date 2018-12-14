import FetchResponse from 'fetchHelper/fetchResponse';

describe('fetchHelper/FetchResponse', () => {
  it('resetStatic should works fine', () => {
    const json = {
      test_res_code: 0,
      test_res_error: 'appException message',
      test_res_body: {
        key1: 'key1',
      },
    };

    FetchResponse.parseHeader = res => ({
      code: res.test_res_code,
      message: res.test_res_error,
    });
    FetchResponse.parseBody = res => res.test_res_body;

    const response = new FetchResponse(json);
    const { header, body, code, message, success } = response;

    expect(header).toEqual({
      code: 0,
      message: 'appException message',
    });
    expect(body).toEqual({
      key1: 'key1',
    });
    expect(code).toBe(0);
    expect(message).toBe('appException message');
    expect(success).toBeTruthy;
  });
});
