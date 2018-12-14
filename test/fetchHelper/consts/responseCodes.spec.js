import * as ResponseCodes from 'fetchHelper/consts/responseCodes';

describe('fetchHelper/consts/ResponseCodes', () => {
  it('ResponseCodes should has 3 members', () => {
    expect(ResponseCodes).toEqual({
      UNKNOWN: -1,
      SUCCESS: 0,
      FAILED: 1,
    });
  });
});
