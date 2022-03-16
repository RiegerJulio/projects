import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';
import { fetchMeals,
  fetchMealCategories,
  fetchDrinks,
  fetchDrinkCategories,
} from '../services/fetchApi';

import RecipesCardFood from '../components/RecipesCardFood';
import RecipesCardDrink from '../components/RecipesCardDrink';
import { setLocalStorage } from '../services/localStorage';

function Provider({ children }) {
  const [searchbtn, setsearchbtn] = useState(true);
  const [mealsArray, setMealsArray] = useState([]);
  const [initialCategoriesFood, setInitialCategoriesFood] = useState([]);
  const [initialCategoriesDrink, setinitialCategoriesDrink] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  }]);

  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {},
    meals: {},
  });

  const [favoriteRecipes, setfavoriteRecipes] = useState(
    [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ],
  );

  const [itemRecovered, setItemRecovered] = useState([]);
  const [testName, settestName] = useState([]);
  const [renderSearch, setRenderSearch] = useState(true);
  const [kind, setKind] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [buttonValue, setButtonValue] = useState('');

  useEffect(() => {
    setLocalStorage('doneRecipes', doneRecipes);
    setLocalStorage('inProgressRecipes', inProgressRecipes);
    setLocalStorage('favoriteRecipes', favoriteRecipes);
  }, [setDoneRecipes, setInProgressRecipes, setfavoriteRecipes]);

  const verify = () => {
    const te = itemRecovered.length > 0
      && Object.fromEntries(
        Object.entries(itemRecovered[0])
          .filter((it1) => it1[0].includes('strIngredient')),
      );
    const te1 = Object.entries(te);
    const te2 = te1
      .filter((val) => val[1] !== null)
      .filter((val) => val[1].length > 0);
    return te2;
  };

  const funcSetSearch = () => {
    setsearchbtn(!searchbtn);
  };

  const requestApiFoods = async () => {
    const mealsApi = await fetchMeals();
    setMealsArray(mealsApi);

    const categories = await fetchMealCategories();
    setInitialCategoriesFood(categories);
  };

  const requestApiDrinks = async () => {
    const drinks = await fetchDrinks();
    setDrinksArray(drinks);

    const categories = await fetchDrinkCategories();
    setinitialCategoriesDrink(categories);
  };

  const foodsRecipe = (meal, index) => (
    <RecipesCardFood
      key={ meal.idMeal }
      idMeal={ meal.idMeal }
      strMeal={ meal.strMeal }
      strMealThumb={ meal.strMealThumb }
      index={ index }
    />
  );

  const drinksRecipe = (drink, index) => (
    <RecipesCardDrink
      key={ drink.idDrink }
      idDrink={ drink.idDrink }
      strDrink={ drink.strDrink }
      strDrinkThumb={ drink.strDrinkThumb }
      index={ index }
    />
  );

  const renderKind = () => (kind === '/foods/' ? mealsArray : drinksArray);

  const choose = (item, index) => {
    if (kind === '/drinks/') {
      return drinksRecipe(item, index);
    }
    return foodsRecipe(item, index);
  };

  const history = useHistory();

  const redirectUniqueItem = () => {
    const kindDiscover = kind === '/drinks/' ? 'idDrink' : 'idMeal';
    history.push(`${kind}${renderKind()[0][`${kindDiscover}`]}`);
  };

  const checkFoodOrDrink = async (func, setFunc) => {
    const storeAPIData = await func(inputSearch);
    const checkerApiData = storeAPIData === null
      ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
      : setFunc([...storeAPIData]);
    return checkerApiData;
  };

  const stateHook = {
    searchbtn,
    funcSetSearch,
    mealsArray,
    setMealsArray,
    initialCategoriesFood,
    initialCategoriesDrink,
    requestApiFoods,
    requestApiDrinks,
    drinksArray,
    setDrinksArray,
    foodsRecipe,
    drinksRecipe,
    doneRecipes,
    setDoneRecipes,
    itemRecovered,
    setItemRecovered,
    verify,
    inProgressRecipes,
    setInProgressRecipes,
    testName,
    settestName,
    setfavoriteRecipes,
    renderSearch,
    setRenderSearch,
    kind,
    setKind,
    checkFoodOrDrink,
    inputSearch,
    setInputSearch,
    choose,
    redirectUniqueItem,
    renderKind,
    setButtonValue,
    buttonValue,
  };

  useEffect(() => {
    requestApiFoods();
    requestApiDrinks();
  }, []);

  return (
    <MyContext.Provider value={ stateHook }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  stateHook: PropTypes.node,
}.isRequired;

export default Provider;
