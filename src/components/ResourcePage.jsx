/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Swapi from '../api/Swapi';
import '../styles/ResourcePage.css';

const invisibleFields = ['created', 'edited', 'url'];

// const Table = async (urlArray) => {
// //   // await Swapi.getResourceByUrl(url);
//   return 'I need some more time to implement tjis block';
// };

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
    img = `/img/${resName}/${id}.jpg`;
  }

  return (
    <>
      {
        resource.length > 0
          ? (
            <div className="res-page">
              <div className="res-img"><img src={img} alt="resource img" onError={(event) => { event.target.src = '/img/placeholder.jpg'; }} /></div>
              {resource
                .filter(([field]) => !invisibleFields.includes(field))
                .map(([field, value], i) => (
                  <div key={i} className="res-field">

                    {(Array.isArray(value))
                      ? (
                        <div className="res-field-list">
                          <div className="res-field-name">{field.replace('_', ' ')}:</div>
                          <span className="res-field-value">{value}</span>
                        </div>
                      )
                      : (
                        <div className="res-field-item">
                          <div className="res-field-name">{field.replace(/_/g, ' ')}: </div>
                          <div className="res-field-value">{value}</div>
                        </div>
                      )
                    }
                  </div>
                ))}
            </div>
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
