import { systemShowLoading, systemHideLoading } from 'actions/systemLoading';

describe('actions/systemLoading', () => {
  it('systemShowLoading should works fine, if input empty message', () => {
    const expectResult = systemShowLoading();
    expect(expectResult).toEqual({
      type: '@@system/SHOW_LOADING',
      payload: undefined,
    });
  });

  it('systemShowLoading should works fine, if input message', () => {
    const expectResult = systemShowLoading('loading message');
    expect(expectResult).toEqual({
      type: '@@system/SHOW_LOADING',
      payload: 'loading message',
    });
  });

  it('systemHideLoading should works fine', () => {
    const expectResult = systemHideLoading();
    expect(expectResult).toEqual({
      type: '@@system/HIDE_LOADING',
    });
  });
});
