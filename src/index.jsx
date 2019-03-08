import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
// import ResourceProvider from './providers/ResourcesProvider';

function renderApp() {
  render(
    <BrowserRouter basename={process.env.ROOT_PATH}>

      <App />

    </BrowserRouter>,

    document.getElementById('root'),
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
