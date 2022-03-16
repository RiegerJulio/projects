import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import MyContext from '../Context/MyContext';

import { fetchMealIngredients, fetchMealsIngredientName } from '../services/fetchApi';

export default function ExploreFoodsIng() {
  const [initialIngredients, setInitialIngredients] = useState([]);
  const { setMealsArray } = useContext(MyContext);

  const MAX_INGREDIENTS = 12;

  const requestIngredients = async () => {
    const ingredients = await fetchMealIngredients();
    console.log(ingredients);
    setInitialIngredients(ingredients);
    console.log(initialIngredients);
  };

  // const history = useHistory();

  const handleClick = async (ing) => {
    const response = await fetchMealsIngredientName(ing);
    setMealsArray(response);
    // history.push('/foods');
  };

  useEffect(() => {
    requestIngredients();
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" kind="Foods" />
      {
        initialIngredients.map((ingredient, index) => (
          <div
            key={ ingredient.strIngredient1 }
          >
            <Link
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(ingredient.strIngredient) }
              to="/foods"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
            </Link>
          </div>
        )).slice(0, MAX_INGREDIENTS)
      }
      <div>Explore Foods By Ingredient</div>
      <LowerMenu />
    </>
  );
}
