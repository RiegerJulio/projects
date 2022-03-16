import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import MyContext from '../Context/MyContext';

import { fetchDrinkIngredients, fetchDrinksIngredientName } from '../services/fetchApi';

export default function ExploreFoodsIng() {
  const [initialIngredients, setInitialIngredients] = useState([]);
  const { setDrinksArray } = useContext(MyContext);

  const MAX_INGREDIENTS = 12;

  const requestIngredients = async () => {
    const ingredients = await fetchDrinkIngredients();
    console.log(ingredients);
    setInitialIngredients(ingredients);
    console.log(initialIngredients);
  };

  // const history = useHistory();

  const handleClick = async (ing) => {
    const response = await fetchDrinksIngredientName(ing);
    setDrinksArray(response);
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
              onClick={ () => handleClick(ingredient.strIngredient1) }
              to="/drinks"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt={ ingredient.strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
            </Link>
          </div>
        )).slice(0, MAX_INGREDIENTS)
      }
      <div>Explore Foods By Ingredient</div>
      <LowerMenu />
    </>
  );
}
