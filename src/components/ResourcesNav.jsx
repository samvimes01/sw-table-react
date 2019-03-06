import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const ResourcesNav = ({ resources }) => (
  resources.length !== 0
    ? (
      <ul>
        <li>
          <NavLink to={process.env.ROOT_PATH}>home</NavLink>
        </li>
        {
          resources
            .map(([resName], i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>
                <NavLink to={resName}>{resName}</NavLink>
              </li>
            ))
        }
      </ul>
    )
    : 'Loading...'
);

ResourcesNav.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ResourcesNav;
