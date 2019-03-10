/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import '../styles/Footer.css';

const Footer = () => (
  <footer className="app-footer">
    <div className="box me">§ 2019 Oleksandr Korneiko</div>
    <div className="box api">
      ® <a href="https://swapi.co/" target="_blanc">SWAPI</a>
    </div>
    <div className="box swars">
      © <a href="https://www.starwars.com/" target="_blanc">Star Wars</a>
    </div>
    <div className="box assets">
      ® <a href="https://github.com/tbone849/star-wars-guide" target="_blanc">Assets</a>
    </div>
    <div className="box company">Company</div>
    <div className="box mate">
      <a href="https://mate.academy/" target="_blanc">Mate Academy</a>
    </div>
    <div className="box lnd">
      <a href="https://www.linkedin.com/in/oleksandr-korneiko/" target="_blanc">Linked in</a>
    </div>
    <div className="box gh">
      <a href="https://github.com/samvimes01" target="_blanc">Github</a>
    </div>
    <div className="box bitb">
      <a href="https://bitbucket.org/SamVimes0/" target="_blanc">Bitbucket</a>
    </div>
    <div className="box coprght">Copyrights</div>
  </footer>
);


export default Footer;
