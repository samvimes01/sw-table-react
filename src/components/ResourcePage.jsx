/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Swapi from '../api/Swapi';
import '../styles/ResourcePage.css';

const invisibleFields = ['created', 'edited', 'url'];

const TableLink = ({ urlArray }) => {
  if (urlArray.length === 0) {
    return 'No known entries';
  }

  const [resItemList, setResItemList] = useState([]);

  const getResName = (url) => {
    const resName = url.match(/\/(\w+)\/\d+\/$/)[1];
    const id = url.match(/\/(\d+)\/$/)[1];
    const img = `/img/${resName}/${id}.jpg`;

    return Swapi.getResourceByUrl(url).then((data) => {
      const title = data.name || data.title;
      return { img, title, url: `/${resName}/${id}/` };
    });
  };

  useEffect(() => {
    if (!resItemList.length) {
      const promises = [];
      urlArray.forEach(url => (promises.push(getResName(url))));
      Promise.all(promises).then((data) => {
        console.dir(data);
        setResItemList(data);
      });
    }
  });

  return (
    resItemList.length <= 0
      ? 'Loading...'
      : (
        <>
          {resItemList.map(({ img, title, url }) => (
            <div className="res-field-list-item">
              <a href={url}><img src={img} alt="resource img" onError={(event) => { event.target.src = '/img/placeholder.jpg'; }} /></a>
              <a href={url}><span>{title}</span></a>
            </div>
          ))}
        </>
      )
  );
};

const ResourcePage = ({ match }) => {
  const [resource, setResource] = useState([]);

  const getParams = (url) => {
    const resName = url.match(/\/(\w+)\//)[1];
    const id = url.match(/\/(\d+)/)[1];
    return { resName, id };
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resource.length) {
      const { resName, id } = getParams(match.url);
      // eslint-disable-next-line prefer-destructuring
      Swapi.getResourceById(resName, id)
        .then((result) => {
          if (result.detail === 'Not found') {
            setResource([[match.url, 'page not found']]);
          } else {
            setResource(Object.entries(result));
          }
        });
    }
  });

  let img = '';
  if (resource.length > 0) {
    const { resName, id } = getParams(match.url);
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
                          <div className="res-field-list-items"><TableLink urlArray={value} /></div>
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
TableLink.propTypes = {
  urlArray: PropTypes.array.isRequired,
};

export default ResourcePage;
