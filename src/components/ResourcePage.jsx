/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import PageContext from '../providers/PageContext';
// import Datatable from './Datatable';
import Swapi from '../api/Swapi';


const ResourcePage = ({ match }) => {
  const [resource, setResource] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resource.length) {
      // хак до того как контекст сделаю
      // eslint-disable-next-line prefer-destructuring
      const url = match.url;
      Swapi.getResourceByUrl(url.substring(1))
        .then((result) => {
          setResource(Object.entries(result));
        });
    }
  });

  return (
    <>
      {JSON.stringify(match)}
      {
        resource.length > 0
          ? (
            <>
              <div><img src={`/img/${match.url.substring(1)}.jpg`} alt="resource img" onError={(event) => { event.target.src = '/img/placeholder.jpg'; }} /></div>
              {resource.map(([field, name], i) => (<div key={i}>{field}: {name}</div>))}
            </>
          )
          : 'Loading...'
      }
    </>
  );
};
//  { resource.map((res) => (<div>res[0]</div>))} }

ResourcePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ResourcePage;
