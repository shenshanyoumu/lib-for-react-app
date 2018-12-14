import processHeaders from 'utils/processHeaders';

describe('utils/processHeaders', () => {
  it('processHeaders should works fine, if does not input args', () => {
    const header = processHeaders();
    expect(header).toEqual({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    });
  });

  it('processHeaders should works fine, if input args', () => {
    const header = processHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'X-Custom-Header': {
        key: 'val',
      },
    });
    expect(header).toEqual({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Custom-Header': '{"key":"val"}',
    });
  });
});
