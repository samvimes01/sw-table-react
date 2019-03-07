/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

import SwApi from '../api/Swapi';


const RootResource = ({ resource: { resName, resUrl } }) => { 
  
  
  return (
    <>
      {resName} - {resUrl}
    </>
  );
};

RootResource.propTypes = {
  resource: PropTypes.shape({
    resName: PropTypes.string,
    resUrl: PropTypes.string,
  }).isRequired,
};

export default RootResource;
