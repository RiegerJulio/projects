import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesCardDrink from '../components/RecipesCardDrink';

import { fetchMealDetailsId } from '../services/fetchApi';
import { getLocalStorage } from '../services/localStorage';

import MyContext from '../Context/MyContext';
import DetailedFoodComponent from '../components/DetailedFoodComponent';
import DetailedFoodParagraph from '../components/DetailedFoodParagraph';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../App.css';

const SIX = 6;

export default function DetailedFood() {
  const [verifyStart, setVerifyStart] = useState(false);
  const [verifyRecipe, setVerifyRecipe] = useState(true);
  const [ImageFav, setImageFav] = useState(whiteHeartIcon);

  const {
    drinksArray,
    requestApiDrinks,
    itemRecovered,
    setItemRecovered,
    verify,
  } = useContext(MyContext);

  const history = useHistory();
  // const idURLLocation = history.location.pathname.split('/')[2];
  const { id } = useParams();

  const recoverData = async () => {
    const recoverFetch = await fetchMealDetailsId(id);
    setItemRecovered([recoverFetch]);
    console.log(recoverFetch);
    requestApiDrinks();
    const getLocal = await getLocalStorage('doneRecipes');
    const getlocalRecipes = await getLocalStorage('inProgressRecipes');
    setVerifyRecipe(getlocalRecipes.meals[id] !== undefined);
    setVerifyStart(getLocal[0].id !== id);
  };

  useEffect(() => {
    recoverData();
  }, []);

  const redirectPageFood = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const shareFunc = () => {
    global.alert('Link copied!');
    navigator.clipboard.writeText(history.location.pathname);
  };

  useEffect(() => {
    const getLocalFav = getLocalStorage('favoriteRecipes');
    if (getLocalFav[0].id === id) {
      setImageFav(blackHeartIcon);
    } else {
      setImageFav(whiteHeartIcon);
    }
  }, []);

  return (
    <div>
      {
        itemRecovered.map((it, index) => (
          <DetailedFoodComponent
            key={ index }
            index={ index }
            strMeal={ it.strMeal }
            strMealThumb={ it.strMealThumb }
            strCategory={ it.strCategory }
            strInstructions={ it.strInstructions }
            strYoutube={ it.strYoutube }
            onClickShare={ shareFunc }
            // onClickFav={ favFunc }
            iconFav={ ImageFav }
          />
        ))
      }
      {
        verify().map((it, index) => (
          <DetailedFoodParagraph
            key={ index }
            index={ index }
            it={ it }
            itemRecovered={ itemRecovered }
          />
        ))
      }
      <div className="recomendations">
        {
          drinksArray.length > 0
          && drinksArray
            .map((drink, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-title` }>
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <RecipesCardDrink
                    idDrink={ drink.idDrink }
                    strDrink={ drink.strDrink }
                    strDrinkThumb={ drink.strDrinkThumb }
                    index={ index }
                  />
                </div>
              </div>
            ))
            .slice(0, SIX)
        }
      </div>
      {verifyStart && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ redirectPageFood }
        >
          Start Recipe
        </button>)}
      {verifyRecipe && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}
