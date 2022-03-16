import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesCardFood from '../components/RecipesCardFood';

import { fetchDrinkDetailsId } from '../services/fetchApi';
import { getLocalStorage } from '../services/localStorage';

import MyContext from '../Context/MyContext';
import DetailedDrinkComponent from '../components/DetailedDrinkComponent';
import DetailedDrinkParagraph from '../components/DetailedDrinkParagraph';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../App.css';

const SIX = 6;

// console.log(getLocalStorage('inProgressRecipes'));

// const verifyCond = () => {
//   if (getLocalStorage('recipesI'))
// }

export default function DetailedDrink() {
  const [verifyStart, setVerifyStart] = useState(false);
  const [verifyRecipe, setVerifyRecipe] = useState(true);
  const [imageFav, setImageFav] = useState(whiteHeartIcon);

  const {
    mealsArray,
    requestApiFoods,
    itemRecovered,
    setItemRecovered,
    verify,
  } = useContext(MyContext);

  const history = useHistory();

  // const item = history.location.pathname.split('/')[2];
  const { id } = useParams();

  const recoverData = async () => {
    const recoverFetch = await fetchDrinkDetailsId(id);
    setItemRecovered([recoverFetch]);
    requestApiFoods();
    const getLocal = await getLocalStorage('doneRecipes');
    const getlocalRecipes = await getLocalStorage('inProgressRecipes');
    setVerifyRecipe(getlocalRecipes.cocktails[id] !== undefined);
    setVerifyStart(getLocal[0].id !== id);
  };

  useEffect(() => {
    recoverData();
  }, []);

  const redirectPageDrink = () => {
    history.push(`/drinks/${id}/in-progress`);
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

  const verifyAlcohoolic = (alco, categ) => {
    if (alco === 'Alcoholic') {
      return alco;
    }
    return categ;
  };

  return (
    <div>
      {
        itemRecovered.length > 0
        && itemRecovered.map((it, index) => (
          <DetailedDrinkComponent
            key={ index }
            index={ index }
            strDrink={ it.strDrink }
            strDrinkThumb={ it.strDrinkThumb }
            strCategory={ verifyAlcohoolic(it.strAlcoholic, it.strCategory) }
            strInstructions={ it.strInstructions }
            onClickShare={ shareFunc }
            // onClickFav={ favFunc }
            iconFav={ imageFav }
          />
        ))
      }
      {
        itemRecovered.length > 0
        && verify().map((it, index) => (
          <DetailedDrinkParagraph
            key={ index }
            index={ index }
            it={ it }
            itemRecovered={ itemRecovered }
          />
        ))
      }
      <div className="recomendations">
        {
          mealsArray.length > 0
          && mealsArray
            .map((meal, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-title` }>
                <div data-testid={ `${index}-recomendation-card` }>
                  <RecipesCardFood
                    idMeal={ meal.idMeal }
                    strMeal={ meal.strMeal }
                    strMealThumb={ meal.strMealThumb }
                    index={ index }
                  />
                </div>
              </div>
            ))
            .slice(0, SIX)
        }
      </div>
      {
        verifyStart && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0px' } }
            onClick={ redirectPageDrink }
          >
            Start
          </button>
        )
      }
      {
        (verifyRecipe && verifyStart) && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0px' } }
          >
            Continue Recipe
          </button>
        )
      }
    </div>
  );
}
