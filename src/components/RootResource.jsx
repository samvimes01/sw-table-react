/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    const img = `/img/${resource}/${id}.jpg`;

    result.id = id;
    result.img = <img src={img} alt="resource img" onError={(event) => { event.target.src = '/img/placeholder.jpg'; }} />;
    // prevent link column data from anchor nesting on rerender
    if (!result.oldLinkColText) {
      result.oldLinkColText = result[colWLink];
    }
    const link = '/' + pathToItem + result[linkId];
    const linkText = result.oldLinkColText;

    result[colWLink] = <a href={link}>{linkText}</a>;

    return result;
  });

  return <Datatable items={items} columnConfig={config} />;
};

class RootResource extends Component {
  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(props.location.search);
    const search = urlParams.get('search') || '';
    const page = +urlParams.get('page') || 1;

    this.state = {
      currentPage: page,
      currentQuery: search,
      resourceList: null,
      waitMessage: 'Loading...',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  fetchData = () => {
    const { currentQuery, currentPage, resourceList } = this.state;
    const { resource: { resName } } = this.props;

    if (!resourceList) {
      Swapi.getResourcesList(resName, currentQuery, currentPage).then((result) => {
        if (result.detail === 'Not found') {
          this.setState({
            waitMessage: `${currentQuery} on ${currentPage} Not found`,
          });
        } else {
          this.setState({
            resourceList: result,
          });
        }
      });
    }
  }

  // тут чувствую как то с редьюсером надо, но пока не умею
  onFilterChange = (query) => {
    const { resource: { resName } } = this.props;

    history.pushState({}, '', `${resName}/?search=${query}&page=${1}`);
    this.setState({
      currentPage: 1,
      currentQuery: query,
      resourceList: null,
    });
  };

  onPageChange = (pageNum) => {
    const { resource: { resName } } = this.props;

    this.setState((prevState) => {
      if (prevState.currentQuery) {
        history.pushState({}, '', `${resName}?search=${prevState.currentQuery}&page=${pageNum}`);
      } else {
        history.pushState({}, '', `${resName}?page=${pageNum}`);
      }
      return {
        currentPage: pageNum,
        resourceList: null,
      };
    });
  };

  render() {
    const { resource: { resName }, match } = this.props;
    const {
      waitMessage,
      resourceList,
      currentQuery,
      currentPage,
    } = this.state;

    const totalResults = resourceList ? resourceList.count : 0;
    const paginatorProps = {
      onPageChange: this.onPageChange,
      currentPage,
      pagesCount: Math.ceil(totalResults / 10),
      totalItems: totalResults,
    };

    return (
      <>
        <Switch>
          <Route exact path={`${match.path}/:id/`} component={ResourcePage} />
          <Route
            path={`${match.path}`}
            render={() => (
              resourceList
                ? (
                  <>
                    <Filter query={currentQuery} onChange={this.onFilterChange} />
                    <Table data={resourceList} resource={resName} />
                    <Paginator {...paginatorProps} />
                  </>
                )
                : waitMessage
            )}
          />
        </Switch>
      </>
    );
  }
}

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
