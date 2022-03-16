import React from 'react';
import PropTypes from 'prop-types';
import Youtube from './Youtube';

export default function DetailedFoodComponent(props) {
  const {
    index,
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
    onClickShare,
    iconFav,
    onClickFav,
  } = props;

  // const getID = (strYtb) => {
  //   if (strYtb !== undefined) {
  //     return strYtb.split('=')[1];
  //   }
  // };

  return (
    <section key={ index }>
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <img
        src={ strMealThumb }
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
      >
        <img
          src={ iconFav }
          alt=""
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="instructions">{strInstructions}</p>
      <div data-testid="video">
        <Youtube video={ strYoutube !== undefined ? strYoutube.split('=')[1] : null } />
      </div>
    </section>
  );
}

DetailedFoodComponent.propTypes = {
  index: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
  strCategory: PropTypes.string,
  strInstructions: PropTypes.string,
  strYoutube: PropTypes.shape({
    split: PropTypes.func,
  }),
}.isRequired;
