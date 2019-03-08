/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatatableHeader from './DtHeader';
import DatatableItem from './DatatableItem';

import '../../styles/Datatable.css';

export default class Datatable extends Component {
  static defaultProps = {
    items: [],
  }

  state = {
    selectedItemsIds: [],
    isAllSelected: false,
    sortKey: '',
    sortOrder: 'asc',
  }

  getData() {
    const { sortKey, sortOrder } = this.state;
    const { items } = this.props;
    if (!items) {
      return [];
    }

    return items
      .sort(this._sortCallback(sortKey, sortOrder));
  }

  getSelected() {
    const { selectedItemsIds } = this.state;
    if (!selectedItemsIds) {
      return null;
    }

    return this.getData().filter(item => selectedItemsIds.includes(item.id));
  }

  _selectAllItems = () => {
    this.setState(({ isAllSelected }) => {
      const renderedItems = this.getData();
      const selectedItemsIds = isAllSelected ? [] : renderedItems.map(item => item.id);
      return {
        isAllSelected: !isAllSelected,
        selectedItemsIds,
      };
    });
  }

  _selectItem = (itemId) => {
    const renderedItems = this.getData();
    const { selectedItemsIds } = this.state;
    // filter all ids except itemId
    const newSelectedItemsIds = selectedItemsIds
      .filter(id => id !== itemId);

    const prevSelectedAmount = selectedItemsIds.length;
    // if itemId was not in selected list - include it
    if (newSelectedItemsIds.length === prevSelectedAmount) {
      newSelectedItemsIds.push(itemId);
    }

    const isAllSelected = renderedItems.length === newSelectedItemsIds.length;

    this.setState({
      isAllSelected,
      selectedItemsIds: newSelectedItemsIds,
    });
  }

  _sortCallback = (sortBy, order) => {
    if (order === 'desc') {
      return (a, b) => {
        let prev = a[sortBy];
        let next = b[sortBy];
        if (!Number.isNaN(parseInt(prev, 10)) && !Number.isNaN(parseInt(next, 10))) {
          prev = parseInt(prev, 10);
          next = parseInt(next, 10);
        }
        switch (typeof prev) {
          case 'number':
            return next - prev;

          case 'string':
            return next.localeCompare(prev);

          default:
            return 1;
        }
      };
    }
    return (a, b) => {
      let prev = a[sortBy];
      let next = b[sortBy];
      if (!Number.isNaN(parseInt(prev, 10)) && !Number.isNaN(parseInt(next, 10))) {
        prev = parseInt(prev, 10);
        next = parseInt(next, 10);
      }
      switch (typeof prev) {
        case 'number':
          return prev - next;

        case 'string':
          return prev.localeCompare(next);

        default:
          return 1;
      }
    };
  }

  _sortItems = (sortBy) => {
    this.setState((prevState) => {
      let order;
      if (prevState.sortOrder === 'asc') {
        order = 'desc';
      } else {
        order = 'asc';
      }

      return {
        sortKey: sortBy,
        sortOrder: order,
      };
    });
  }

  render() {
    const {
      selectedItemsIds,
      isAllSelected,
      sortKey,
      sortOrder,
    } = this.state;

    const { columnConfig } = this.props;

    const renderedItems = this.getData();

    const itemProps = {
      selectedItemsIds,
      columns: columnConfig,
      onSelectItem: this._selectItem,
    };

    const headerProps = {
      columns: columnConfig,
      isAllSelected,
      onAllSelect: this._selectAllItems,
      onSortItems: this._sortItems,
      sortInfo: { sortKey, sortOrder },
    };

    return (
      <table className="tabledata">
        <DatatableHeader {...headerProps} />
        <tbody>
          {renderedItems.map(item => <DatatableItem key={item.id} item={item} {...itemProps} />)}
        </tbody>
      </table>
    );
  }
}


Datatable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
  })),
  columnConfig: PropTypes.shape({
    title: PropTypes.string,
    isSortable: PropTypes.bool,
    isSearchable: PropTypes.bool,
  }).isRequired,
};
