import React, { Component } from 'react';
import PropTypes from 'prop-types';

const searchableFields = {
  people: ['name'],
  films: ['title'],
  starships: ['name', 'model'],
  vehicles: ['name', 'model'],
  species: ['name'],
  planets: ['name'],
};
// all visible fields also are searchable
const visibleFields = {
  people: ['name', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass', 'skin_color'],
  films: ['title', 'episode_id', 'opening_crawl', 'director', 'producer', 'release_date'],
  starships: ['name', 'model', 'starship_class', 'manufacturer', 'cost_in_credits', 'length', 'crew', 'passengers', 'max_atmosphering_speed', 'hyperdrive_rating', 'MGLT', 'cargo_capacity', 'consumables'],
  vehicles: ['name', 'model', 'vehicle_class', 'manufacturer', 'length', 'cost_in_credits', 'crew', 'passengers', 'max_atmosphering_speed', 'cargo_capacity', 'consumables'],
  species: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'eye_colors', 'hair_colors', 'skin_colors', 'language', 'homeworld'],
  planets: ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water'],
};

const { Provider } = React.createContext();

export class SchemaParser extends Component {
  state = {
    currentPage: 1,
    selectedItemsIds: [],
    isAllSelected: false,
    currentQuery: '',
  }

  results = {
    searchResults: [],
    rootResResults: [],
    peopleResults: [],
    filmsResults: [],
    starshipsResults: [],
    vehiclesResults: [],
    speciesResults: [],
    planetsResults: [],
  }

  handleFilterChange = (query) => {
    this.setState({
      currentQuery: query,
      currentPage: 1,
      isAllSelected: false,
      selectedItemsIds: [],
    });
  }

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  }

  getConfig = (resource) => {
    const result = {
      img: {
        title: 'image',
      },
    };
    visibleFields[resource].forEach((field) => {
      result[field] = {
        title: field,
        isSortable: true,
        isSearchable: searchableFields[resource].includes(field),
      };
    });
    return result;
  }

  render() {
    const { children } = this.props;
    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    );
  }
}

const ConfigProvider = {
  getConfig: (resource) => {
    const result = {
      img: {
        title: 'image',
      },
    };
    visibleFields[resource].forEach((field) => {
      result[field] = {
        title: field,
        isSortable: true,
        isSearchable: searchableFields[resource].includes(field),
      };
    });
    return result;
  },
};

SchemaParser.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ConfigProvider;
