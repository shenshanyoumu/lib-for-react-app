import React from 'react';
import BaseComponent from 'BaseComponent';
import withServerRender from 'withServerRender';

describe('withServerRender', () => {
  it('withServerRender should be a function', () => {
    expect(withServerRender).toBeInstanceOf(Function);
  });

  it('withServerRender should return a function', () => {
    const func = withServerRender();
    expect(func).toBeInstanceOf(Function);
  });

  it('withServerRender‘s return should return a class', () => {
    const Comp = withServerRender()(<div />);
    expect(Comp).toBeInstanceOf(Function);
    expect(new Comp()).toBeInstanceOf(BaseComponent);
  });
});
