import React from 'react';
import { renderIntoDocument } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

export default function renderWithIntl(element) {
  let instance;

  renderIntoDocument(
    <IntlProvider>
      {React.cloneElement(element, {
        ref: comp => (instance = comp.refs.wrappedInstance),
      })}
    </IntlProvider>
  );

  return instance;
}
