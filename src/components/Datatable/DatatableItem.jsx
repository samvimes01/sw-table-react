/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const DatatableItem = ({
  selectedItemsIds,
  columns,
  item,
  onSelectItem,
}) => (
  <tr>
    <td>
      <input
        type="checkbox"
        checked={selectedItemsIds.includes(item.id)}
        onChange={() => onSelectItem(item.id)}
      />
    </td>
    {Object.keys(columns).map((col, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <td key={i}>
        {item[col]}
      </td>
    ))}
  </tr>
);

DatatableItem.propTypes = {
  selectedItemsIds: PropTypes.array,

  columns: PropTypes.shape({
    title: PropTypes.string,
    isSortable: PropTypes.bool,
    isSearchable: PropTypes.bool,
  }).isRequired,

  onSelectItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

DatatableItem.defaultProps = {
  selectedItemsIds: [],
};

export default DatatableItem;
