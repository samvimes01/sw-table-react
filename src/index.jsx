import React from 'react';
import { render } from 'react-dom';

import './styles/index.css';
import App from './components/App';

function renderApp() {
  render(<App />, document.getElementById('root'));
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
