import React from 'react';
// import BaseComponent from 'BaseComponent';
import withIntl from 'withIntl';

describe('withIntl', () => {
  it('withIntl should be a function', () => {
    expect(withIntl).toBeInstanceOf(Function);
  });

  it('withIntl should return a function', () => {
    const func = withIntl('en', 'home');
    expect(func).toBeInstanceOf(Function);
  });

  it('withIntl‘s return should return a class', () => {
    const Comp = withIntl('en', 'home', '/')(<div />);
    expect(Comp).toBeInstanceOf(Function);
    // expect(new Comp()).toBeInstanceOf(BaseComponent);
  });
});
