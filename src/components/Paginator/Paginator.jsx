/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Paginator.css';

const Paginator = (props) => {
  const perPage = 10;
  const {
    onPageChange,
    currentPage,
    pagesCount,
    totalItems,
    info,
  } = props;

  const getStartItem = () => (
    (currentPage - 1) * perPage
  );

  const getEndItem = () => {
    const startIndex = getStartItem();
    return Math.min(startIndex + perPage, totalItems);
  };

  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  };

  const getCorrectPage = page => (
    Math.min(
      Math.max(1, page), pagesCount,
    )
  );

  const getPrevPage = () => (
    getCorrectPage(currentPage - 1)
  );

  const getNextPage = () => (
    getCorrectPage(currentPage + 1)
  );

  return (
    <div className="paginator">
      <button
        type="button"
        className={currentPage === 1 ? 'paginator__page-button disabled' : 'paginator__page-button'}
        onClick={() => onPageChange(getPrevPage())}
        disabled={currentPage === 1}
      >
        {'<-'}
      </button>
      {getPages().map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(getCorrectPage(page))}
          className={(page === currentPage) ? 'paginator__page-button paginator__page-button--current disabled' : 'paginator__page-button'}
          disabled={currentPage === page}
        >
          { page }
        </button>
      ))}
      <button
        type="button"
        className={currentPage === pagesCount ? 'paginator__page-button disabled' : 'paginator__page-button'}
        onClick={() => onPageChange(getNextPage())}
        disabled={currentPage === pagesCount}
      >
        {'->'}
      </button>

      {info
        ? (
          <span data-element="page-info" className="paginator__page-info">
              Show {getStartItem() + 1} to {getEndItem()} phones from {totalItems}
          </span>
        )
        : ''
      }
    </div>
  );
};

Paginator.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  info: PropTypes.bool,
};
Paginator.defaultProps = {
  info: false,
};

export default Paginator;
