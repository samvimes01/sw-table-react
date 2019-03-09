import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';

function renderApp() {
  render(
    <HashRouter basename={process.env.ROOT_PATH}>
      <App />
    </HashRouter>,

    document.getElementById('root'),
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
