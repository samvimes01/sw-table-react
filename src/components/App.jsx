/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';

import Swapi from '../api/Swapi';
import ResourcesNav from './ResourcesNav';
import Homepage from './Homepage';
import Footer from './Footer';
import RootResource from './RootResource';

import logo from '../img/logo.svg';
import '../styles/App.css';

const App = () => {
  const [resources, setResources] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resources.length) {
      Swapi.getRoot()
        .then((result) => {
          setResources(Object.entries(result));
        });
    }
  });

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          SWAPI datatable
        </p>
      </header>

      <nav className="app-menu">
        {<ResourcesNav resources={resources} />}
      </nav>

      <main className="app-main">
        <section className="app-content">
          <Switch>
            <Route exact path="/" component={Homepage} />
            {resources
              .map(([resName, resUrl], i) => (
                <Route
                  key={i}
                  path={'/' + resName}
                  render={props => (<RootResource resource={{ resName, resUrl }} {...props} />)}
                />
              ))}
          </Switch>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default hot(module)(App);
