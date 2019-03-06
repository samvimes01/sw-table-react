import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';


import logo from '../img/logo.svg';
import '../styles/App.css';

const App = () => (
  <div className="app">
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <p>
       [awesome] react app

      </p>
    </header>
    <main className="app-main">
      place app here
    </main>
    <footer className="app-footer">
      footer
    </footer>
  </div>
);

export default hot(module)(App);
