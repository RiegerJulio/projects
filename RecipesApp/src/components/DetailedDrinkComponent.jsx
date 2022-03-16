import React from 'react';
import PropTypes from 'prop-types';

export default function DetailedDrinkComponent(props) {
  const {
    index,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
    onClickShare,
    onClickFav,
    iconFav,
  } = props;
  return (
    <section key={ index }>
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img
        src={ strDrinkThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickShare }
      >
        Share
      </button>
      <button
        type="button"
        onClick={ onClickFav }
        src={ iconFav }
      >
        <img
          src={ iconFav }
          alt=""
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="instructions">{strInstructions}</p>
    </section>
  );
}

DetailedDrinkComponent.propTypes = {
  index: PropTypes.string,
  drinkMeal: PropTypes.string,
  drinkMealThumb: PropTypes.string,
  drinkCategory: PropTypes.string,
  drinkInstructions: PropTypes.string,
}.isRequired;
