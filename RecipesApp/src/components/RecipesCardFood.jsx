import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipesCardFood({ idMeal, strMeal, strMealThumb, index }) {
  const history = useHistory();

  const sendInfo = () => {
    history.push(`/foods/${idMeal}`);
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      key={ idMeal }
      onClick={ sendInfo }
      src={ strMealThumb }
    >
      <img
        className="food-img"
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
    </button>
  );
}

RecipesCardFood.propTypes = {
  idMeal: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCardFood;
