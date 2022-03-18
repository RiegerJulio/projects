import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiShare } from 'react-icons/hi';
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
      <h1 data-testid="page-title" className="header-title">{strMeal}</h1>
      <img
        className="img-recipe"
        src={ strMealThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <div className="actions-container">
        <Link
          to="#t"
          data-testid="share-btn"
          onClick={ onClickShare }
        >
          <HiShare size={ 40 } color="ffffff" />
        </Link>
        <Link
          to="#t"
          onClick={ onClickFav }
        >
          <img
            className="heart-outline"
            src={ iconFav }
            alt="icon fav"
            data-testid="favorite-btn"
          />
        </Link>
      </div>
      <h5 className="category" data-testid="recipe-category">{`#${strCategory}`}</h5>
      <div className="instructions-container">
        <h5 className="category" data-testid="recipe-category">Preparation</h5>
        <p className="instructions" data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="youtube-box" data-testid="video">
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
