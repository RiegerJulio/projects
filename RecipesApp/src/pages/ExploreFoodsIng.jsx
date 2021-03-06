/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import MyContext from '../Context/MyContext';

import headerLogo from '../images/header-logo.png';
import './css/explore.css';

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
    setTimeout(() => {
      const elem = document.querySelector('.carousel');
      const instance = M.Carousel.init(elem, {});
      if (document.querySelector('.photos').classList) {
        document.querySelector('.photos').classList.remove('spinner');
      }
    }, 1000);
    requestIngredients();
  }, []);

  return (
    <div className="explore-container">
      <div className="header-container">
        <Header title="Explore" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <div className="white-space"/>
      </div>
      <h1 data-testid="page-title" className="header-title">Choose Ingredient</h1>
      <div className="carousel carousel-ing">
        {initialIngredients
          .map((ingredient, index) => (
            <Link
              key={ ingredient.strIngredient1 }
              className="carousel-item"
              to="/foods"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => handleClick(ingredient.strIngredient) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
                alt={ ingredient.strIngredient }
              />
              <p className="food-name" data-testid={ `${index}-card-name` }>
                {ingredient.strIngredient}
              </p>
            </Link>
          ))
          .slice(0, MAX_INGREDIENTS)}
      </div>
      <LowerMenu />
    </div>
  );
}
