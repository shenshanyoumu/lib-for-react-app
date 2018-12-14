import testHelper from 'testHelper/index';

describe('testHelper/index', () => {
  it('createComponentWithIntl should export correct', () => {
    expect(testHelper.createComponentWithIntl).toBeInstanceOf(Function);
  });

  it('renderWithIntl should export correct', () => {
    expect(testHelper.renderWithIntl).toBeInstanceOf(Function);
  });
});
