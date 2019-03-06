import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const ResourcesNav = ({ resources }) => (
  resources
    ? (
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
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
