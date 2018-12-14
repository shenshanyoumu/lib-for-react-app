import camelCaseKeys from 'utils/camelCaseKeys';

describe('utils/camelCaseKeys', () => {
  it('should return original value, when input a number', () => {
    expect(camelCaseKeys(1)).toBe(1);
  });

  it('should return original value, when input a string', () => {
    expect(camelCaseKeys('string')).toBe('string');
  });

  it('should return new value, when object has keys divided by "-"', () => {
    expect(
      camelCaseKeys({
        'test-key': 1,
      })
    ).toEqual({
      testKey: 1,
    });
  });

  it('should return new value, when object has keys divided by "_"', () => {
    expect(
      camelCaseKeys({
        test_key: 1,
      })
    ).toEqual({
      testKey: 1,
    });
  });

  it('should return original value, when object has camelCase keys', () => {
    expect(
      camelCaseKeys({
        testKey: 1,
      })
    ).toEqual({
      testKey: 1,
    });
  });

  it('should return original array, when input a plain array', () => {
    expect(camelCaseKeys([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return new array, when each item has keys divided by "_"', () => {
    expect(
      camelCaseKeys([
        {
          test_key: 1,
        },
      ])
    ).toEqual([
      {
        testKey: 1,
      },
    ]);
  });
});
