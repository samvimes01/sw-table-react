/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
// import fs from 'fs';
import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import shortid from 'shortid';

import Filter from './Filter';
// import Paginator from './Paginator';
// import PageContext from '../providers/PageContext';
import Datatable from './Datatable';
import ResourcePage from './ResourcePage';

import Swapi from '../api/Swapi';
import { getConfig, getColWithLinks } from '../api/ConfigBuilder';

import { SwapiContext } from '../providers/ResourcesProvider';

const Table = ({ data, resource }) => {
  if (!data) {
    return <>Loading...</>;
  }

  // получаем конфиг для datatable и колонку в которой будут ссылки
  const config = getConfig(resource);
  const colWLink = getColWithLinks(resource);
  const { link: linkCfg } = config;
  delete config.link;
  // удалим из конфига паттерн ссылки - это не для рендера,
  // но из него надо вытянуть путь и название поля из которго брать ссылку
  // лишняя работа, т.к. в результатах есть url на каждый item, но таково условие
  // можно и split(':') но не хочу
  const pathNlinkId = linkCfg.match(/(.+\/):(\w+$)/);
  const pathToItem = pathNlinkId[1];
  const linkId = pathNlinkId[2];

  // const regex = RegExp(/(.+\/):(\w+$)/, 'g');
  // const pathNlinkId = regex.exec(linkCfg);
  // const pathToItem = pathNlinkId[pathNlinkId.length - 2];
  // const linkId = pathNlinkId[pathNlinkId.length - 1];

  // апи выдает результат без картинки, без id  и без ссылки - добавляем их
  const items = data.results.map((result) => {
    const id = result.url.match(/\/(\d+)\/$/)[1];
    const img = `/img/${resource}/${id}.jpg`;

    result.id = id;
    result.img = <img src={img} alt="resource img" onError={(event) => { event.target.src = '/img/placeholder.jpg'; }} />;
    // prevent link column data from anchor nesting on rerender
    if (!result.oldLinkColText) {
      result.oldLinkColText = result[colWLink];
    }
    const link = pathToItem + result[linkId];
    const linkText = result.oldLinkColText;

    result[colWLink] = <a href={link}>{linkText}</a>;

    return result;
  });

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
  const context = useContext(SwapiContext);
  const { currentQuery, onFilterChange } = context;

  const [resourceList, setResourceList] = useState(null);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!resourceList) {
      Swapi.getResourcesList(resName).then((result) => {
        setResourceList(result);
      });
    }
  });

  const [prevQuery, setPrevQuery] = useState(null);
  useEffect(() => {
    if (currentQuery && currentQuery !== prevQuery) {
      Swapi.getSearchResults(resName, currentQuery).then((result) => {
        // оказывается порядок имеет значение - иначе 2 раза запрос к апи
        setPrevQuery(currentQuery);
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
          render={() => (
            <>
              <Filter query={currentQuery} onChange={onFilterChange} />
              <Table data={resourceList} resource={resName} />
            </>
          )}
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
