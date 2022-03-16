import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipesCardDrink({ idDrink, strDrink, strDrinkThumb, index }) {
  const history = useHistory();

  const sendInfo = () => {
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      key={ idDrink }
      onClick={ sendInfo }
      src={ strDrinkThumb }
    >
      <img
        className="food-img"
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h2 data-testid={ `${index}-card-name` }>{ strDrink }</h2>
    </button>
  );
}

RecipesCardDrink.propTypes = {
  idDrink: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCardDrink;
