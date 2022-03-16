import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';
import IngredientsList from './IngredientsList';
import { setLocalStorage } from '../services/localStorage';

export default function InProgressDrinkComponent(props) {
  const {
    index,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
  } = props;

  const {
    itemRecovered,
    // setItemRecovered,
  } = useContext(MyContext);
  // console.log(itemRecovered);

  const onButtonClickFinish = () => {
    const { history } = props;
    setLocalStorage('doneRecipes', doneRecipes);
    history.push('/done-recipes');
  };

  //   a chave doneRecipes deve conter a seguinte estrutura:
  // [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  return (
    <section key={ index }>
      <img
        src={ strDrinkThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button type="button" data-testid="share-btn">
        Share
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <h1>Ingredients</h1>
      <IngredientsList itemRecovered={ itemRecovered } />
      <p data-testid="instructions">{ strInstructions }</p>
      {
        <button
          // disabled={ doneRecipe }
          data-testid="finish-recipe-btn"
          type="button"
          className="button-finish-recipe"
          onClick={ () => onButtonClickFinish }
        >
          Finalizar Receita
        </button>
      }
    </section>
  );
}

InProgressDrinkComponent.propTypes = {
  index: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strCategory: PropTypes.string,
  strInstructions: PropTypes.string,

}.isRequired;
