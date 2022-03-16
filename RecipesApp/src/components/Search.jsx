import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';

import {
  fetchMealsIngredientName,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinksIngredientName,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/fetchApi';

import MyContext from '../Context/MyContext';

function Search() {
  const [storeWord, setStoreWord] = useState('');
  const {
    setMealsArray,
    setDrinksArray,
    kind,
    checkFoodOrDrink,
    inputSearch,
    setInputSearch,
    setButtonValue,
  } = useContext(MyContext);

  const [toggleShowBar, setToggleShowBar] = useState(false);

  const recoverData = async (func1, func2) => {
    const mealsOrDrinks = kind === '/drinks/'
      ? checkFoodOrDrink(func2, setDrinksArray) : checkFoodOrDrink(func1, setMealsArray);
    return mealsOrDrinks;
  };

  const firstLetterCheck = async () => {
    const checker = inputSearch.length > 1
      ? global.alert('Your search must have only 1 (one) character')
      : await recoverData(fetchMealsFirstLetter, fetchDrinksFirstLetter);
    return checker;
  };

  const switchCase = () => {
    switch (storeWord) {
    case 'ingredient':
      recoverData(fetchMealsIngredientName, fetchDrinksIngredientName);
      break;
    case 'name':
      recoverData(fetchMealsName, fetchDrinksName);
      break;
    case 'first-letter':
      firstLetterCheck();
      break;
    default:
    }
    setButtonValue('Search');
  };

  return (
    <section>
      <button
        type="button"
        data-testid="search-top-btn"
        src={ searchIcon }
        onClick={ () => setToggleShowBar(!toggleShowBar) }
      >
        <img src={ searchIcon } alt="search icon" />
      </button>
      { toggleShowBar ? (
        <div>
          <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ ({ target }) => setInputSearch(target.value) }
          />
          <label htmlFor="ingredient-search">
            Ingredient Search
            <input
              type="radio"
              name="search"
              id="ingredient-search"
              data-testid="ingredient-search-radio"
              onChange={ () => setStoreWord('ingredient') }
            />
          </label>
          <label htmlFor="name-search">
            Name Search
            <input
              type="radio"
              name="search"
              id="name-search"
              data-testid="name-search-radio"
              onChange={ () => setStoreWord('name') }
            />
          </label>
          <label htmlFor="first-letter-search">
            First Letter Search
            <input
              type="radio"
              name="search"
              id="first-letter-search"
              data-testid="first-letter-search-radio"
              onChange={ () => setStoreWord('first-letter') }
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ switchCase }
          >
            Search
          </button>
        </div>
      ) : null}
    </section>
  );
}

Search.propTypes = {
  title: PropTypes.string,
  kind: PropTypes.string,
}.isRequired;

export default Search;
