import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';

function renderApp() {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,

    document.getElementById('root'),
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
