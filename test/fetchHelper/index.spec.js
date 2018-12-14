import FetchHelper from 'fetchHelper';

describe('fetchHelper', () => {
  it('Consts should be an object', () => {
    expect(FetchHelper.Consts).toBeInstanceOf(Object);
  });

  it('FetchRequest should be an object', () => {
    expect(FetchHelper.FetchRequest).toBeInstanceOf(Object);
  });

  it('FetchResponse should be an object', () => {
    expect(FetchHelper.FetchResponse).toBeInstanceOf(Object);
  });

  it('fetchException should be an object', () => {
    expect(FetchHelper.FetchException).toBeInstanceOf(Object);
  });
});
