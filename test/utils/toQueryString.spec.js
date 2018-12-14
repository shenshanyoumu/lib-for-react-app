import toQueryString from 'utils/toQueryString';

describe('utils/toQueryString', () => {
  it('should return original value, when input a number', () => {
    expect(toQueryString(1)).toBe(1);
  });

  it('should return original value, when input a string', () => {
    expect(toQueryString('string')).toBe('string');
  });

  it('should return string, when input an object', () => {
    const original = {
      key1: 'val1',
      key2: 'val2',
    };
    expect(toQueryString(original)).toBe('key1=val1&key2=val2');
  });

  it('should works fine, when input an object which has a simple array value', () => {
    const original = {
      key1: 'val1',
      key2: [1, 2],
    };
    expect(toQueryString(original)).toBe('key1=val1&key2=1%2C2');
    // isDuplicateKey
    expect(toQueryString(original, true)).toBe('key1=val1&key2=1&key2=2');
  });

  it('should works fine, when input an object which has a complex array value', () => {
    const original = {
      key1: 'val1',
      key2: [
        {
          o1: 'obj1',
          o2: 'obj2',
        },
      ],
    };
    expect(toQueryString(original)).toBe(
      'key1=val1&key2=%7B%22o1%22%3A%22obj1%22%2C%22o2%22%3A%22obj2%22%7D'
    );
  });

  it('should return string, when input an simple array', () => {
    const original = ['val1', 'val2'];
    expect(toQueryString(original)).toBe('0=val1&1=val2');
  });

  it('should works fine, when input an complex array', () => {
    const original = [
      'val1',
      {
        o1: 'obj1',
        o2: 'obj2',
      },
    ];
    expect(toQueryString(original)).toBe('0=val1&1=%5Bobject%20Object%5D');
  });
});
