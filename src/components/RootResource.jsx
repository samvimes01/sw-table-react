/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
// import fs from 'fs';
import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Filter from './Filter';
import Paginator from './Paginator';
import Datatable from './Datatable';
import ResourcePage from './ResourcePage';

import Swapi from '../api/Swapi';

import { getConfig, getColWithLinks } from '../api/ConfigBuilder';

const Table = ({ data, resource }) => {
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

  // апи выдает результат без картинки, без id  и без ссылки - добавляем их
  const items = data.results.map((result) => {
    const id = result.url.match(/\/(\d+)\/$/)[1];
    const img = `${process.env.ROOT_PATH}img/${resource}/${id}.jpg`;

    result.id = id;
    result.img = <img src={img} alt="resource img" onError={(event) => { event.target.src = `${process.env.ROOT_PATH}img/placeholder.jpg`; }} />;
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

function reducer(state, action) {
  switch (action.type) {
    case 'notFound':
      return { waitMessage: 'Not Found' };
    case 'fetchResults':
      return { resourceList: action.resList, currentQuery: state.currentQuery, currentPage: state.currentPage, redirect: false };
    case 'filterChange':
      return { resourceList: null, currentQuery: action.query, currentPage: 1, redirect: true };
    case 'pageChange':
      return { resourceList: null, currentQuery: state.currentQuery, currentPage: action.pageNum, redirect: true };
    default:
      throw new Error();
  }
}

const RootResource = ({ resource: { resName, resUrl }, match, location }) => {
  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get('search') || '';
  const page = +urlParams.get('page') || 1;

  const initialState = {
    currentPage: page,
    currentQuery: search,
    resourceList: null,
    redirect: false,
    waitMessage: 'Loading...',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // let waitMessage = 'Loading...';
  // const [currentPage, setCurrentPage] = useState(page);
  // const [currentQuery, setCurrentQuery] = useState(search);
  // const [resourceList, setResourceList] = useState(null);
  // const [redirect, setRedirect] = useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(
    () => {
      const { currentQuery, currentPage, resourceList } = state;
      if (!resourceList) {
        Swapi.getResourcesList(resName, currentQuery, currentPage).then((result) => {
          if (result.detail === 'Not found') {
            dispatch({ type: 'notFound' });
          } else {
            dispatch({ type: 'fetchResults', resList: result });
            // setResourceList(result);
          }
        });
      }
    },
  );

  // тут чувствую как то с редьюсером надо, но пока не умею
  const onFilterChange = (query) => {
    // оказывается порядок имеет значение
    // setCurrentQuery(query);
    // setCurrentPage(1);
    // setResourceList(null);
    // setRedirect(true);
    dispatch({ type: 'filterChange', query });
  };

  const onPageChange = (pageNum) => {
    console.log(pageNum);
    // setCurrentPage(pageNum);
    // setResourceList(null);
    // setRedirect(true);
    dispatch({ type: 'pageChange', pageNum });
  };
  const totalResults = state.resourceList ? state.resourceList.count : 0;
  const paginatorProps = {
    onPageChange,
    currentPage: state.currentPage,
    pagesCount: Math.ceil(totalResults / 10),
    totalItems: totalResults,
  };

  const getRedirUrl = () => {
    const url = `/${resName}/?search=${state.currentQuery}&page=${state.currentPage}`;
    return url;
  };

  return (
    <>
      {resName} - {resUrl}
      {state.redirect ? <Redirect to={getRedirUrl()} /> : null}
      <br />
      <Switch>
        <Route exact path={`${match.path}/:id`} component={ResourcePage} />
        <Route
          path={`${match.path}`}
          render={() => (
            state.resourceList
              ? (
                <>
                  <Filter query={state.currentQuery} onChange={onFilterChange} />
                  <Table data={state.resourceList} resource={resName} />
                  <Paginator {...paginatorProps} />
                </>
              )
              : state.waitMessage
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
  location: PropTypes.object.isRequired,
};

export default RootResource;
