/* eslint-disable react/no-array-index-key */
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
  let img = '';
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resource.length) {
      // eslint-disable-next-line prefer-destructuring
      Swapi.getResourceByUrl(match.url.substring(1))
        .then((result) => {
          if (result.detail === 'Not found') {
            setResource([[match.url, 'page not found']]);
          } else {
            setResource(Object.entries(result));
          }
        });
    }
  });

  if (resource.length > 0) {
    const resName = match.url.match(/\/(\w+)\//)[1];
    const id = match.url.match(/\/(\d+)/)[1];
    img = `${process.env.ROOT_PATH}img/${resName}/${id}.jpg`;
  }

  return (
    <>
      {
        resource.length > 0
          ? (
            <>
              <div><img src={img} alt="resource img" onError={(event) => { event.target.src = `${process.env.ROOT_PATH}img/placeholder.jpg`; }} /></div>
              {resource.map(([field, name], i) => (<div key={i}>{field}: {name}</div>))}
            </>
          )
          : 'Loading...'
      }
    </>
  );
};

ResourcePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ResourcePage;
