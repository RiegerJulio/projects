import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategory({ strCategory, index, func }) {
  return (
    <button
      id={ strCategory }
      type="submit"
      key={ index }
      data-testid={ `${strCategory}-category-filter` }
      onClick={ func }
    >
      { strCategory }
    </button>
  );
}

ButtonCategory.propTypes = {
  strCategory: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
