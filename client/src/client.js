import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'semantic-ui-css/semantic.min.css';

import Route from './route';

ReactDOM.render(
  <AppContainer>
    <Route />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./client', () => {
    const NextRoute = require('./route').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NextRoute />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
