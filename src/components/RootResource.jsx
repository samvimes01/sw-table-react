/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
// import fs from 'fs';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import fileExists from 'file-exists';

// import Filter from './Filter';
// import Paginator from './Paginator';
// import PageContext from '../providers/PageContext';
import Datatable from './Datatable';
import Swapi from '../api/Swapi';
import ResourcePage from './ResourcePage';
import ConfigProvider from '../providers/ResourcesProvider';

const Table = ({ data, resource }) => {
  if (!data) {
    return <>Loading...</>;
  }

  const items = data.results.map((result) => {
    result.id = shortid.generate();
    const resApiId = result.url.slice(-2, -1);
    const img = `/img/${resource}/${resApiId}.jpg`;
    result.img = <img src={img} alt="resource img" onError={(event) => {event.target.src = '/img/placeholder.jpg'}} />;
    return result;
  });
  const config = ConfigProvider.getConfig(resource);

  return <Datatable items={items} columnConfig={config} />;
};
// Datatable.contextType = PageContext;
/* <Filter query={currentQuery} onChange={this.handleFilterChange} />
<PageContext.Provider value={context}>
  <Paginator />

  <Datatable />

  <Paginator info />
</PageContext.Provider> */
const RootResource = ({ resource: { resName, resUrl }, match }) => {
  const [resourceList, setResourceList] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resourceList) {
      Swapi.getResourcesList(resName).then((result) => {
        setResourceList(result);
      });
    }
  });

  // const pagesCount = Math.ceil(renderedItems.length / perPage);

  // const context = {
  //   onPageChange: this.handlePageChange,
  //   perPage,
  //   currentPage,
  //   pagesCount,
  //   totalItems: renderedItems.length,
  // };

  return (
    <>
      {resName} - {resUrl}
      <br />
      <Switch>
        <Route exact path={`${match.path}/:id`} component={ResourcePage} />
        <Route
          render={() => <Table data={resourceList} resource={resName} />}
        />
      </Switch>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.object,
  resource: PropTypes.string.isRequired,
};

Table.defaultProps = {
  data: null,
};

RootResource.propTypes = {
  resource: PropTypes.shape({
    resName: PropTypes.string,
    resUrl: PropTypes.string,
  }).isRequired,
  match: PropTypes.object.isRequired,
};

export default RootResource;
