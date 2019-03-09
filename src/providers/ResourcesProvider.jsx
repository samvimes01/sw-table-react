/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SwapiContext = React.createContext();

export class SwapiProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      isAllSelected: false,
      currentQuery: '',
      onFilterChange: this.onFilterChange.bind(this),
      onPageChange: this.onPageChange.bind(this),
    };
  }

  // results = {
  //   searchResults: [],
  //   rootResResults: [],
  //   peopleResults: [],
  //   filmsResults: [],
  //   starshipsResults: [],
  //   vehiclesResults: [],
  //   speciesResults: [],
  //   planetsResults: [],
  // }

  onFilterChange(query) {
    this.setState({
      currentQuery: query,
      currentPage: 1,
      isAllSelected: false,
    });
  }

  onPageChange(currentPage) {
    this.setState({ currentPage });
  }

  render() {
    const { children } = this.props;
    return (
      <SwapiContext.Provider value={this.state}>
        {children}
      </SwapiContext.Provider>
    );
  }
}

SwapiProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
