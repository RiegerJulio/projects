import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesCardFood from '../components/RecipesCardFood';
import Search from '../components/Search';
import MyContext from '../Context/MyContext';
import {
  fetchMealNationalities,
  fetchMealsName,
  fetchMealsNationality,
} from '../services/fetchApi';

export default function ExploreFoodsNat() {
  const NUMBER_CARDS_INITIAL = 12;
  const [nationalities, setNationalities] = useState([]);
  const [menu, setMenu] = useState('All');
  const {
    mealsArray,
    setMealsArray } = useContext(MyContext);

  const grabNationalities = async () => {
    const fetchNationalities = await fetchMealNationalities();
    setNationalities(fetchNationalities);
  };

  const getMeals = async () => {
    const fetchMeals = await fetchMealsName('');
    setMealsArray(fetchMeals);
  };

  const fetchFoodsInNationality = async (nat) => {
    const fetchMealsNat = await fetchMealsNationality(nat);
    setMealsArray(fetchMealsNat);
  };

  useEffect(() => {
    grabNationalities();
    getMeals();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setMenu(value);
    if (value === 'All') {
      getMeals();
    } fetchFoodsInNationality(value);
  };

  return (
    <>
      <Header title="Explore Nationalities" renderSearchBtn="true" />
      <Search />
      <div>
        <select
          name="dropdown"
          id="nationalities"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
          value={ menu }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {
            nationalities.map((opt) => (
              <option
                key={ opt.strArea }
                data-testid={ `${opt.strArea}-option` }
                value={ nationalities.strArea }
              >
                { opt.strArea }
              </option>
            ))
          }
        </select>
      </div>
      <div>
        {
          mealsArray && mealsArray.map((meal, index) => (
            // <Link
            //   to={ `/foods/${meal.idMeal}` }
            //   key={ meal.idMeal }
            // >
            <RecipesCardFood
              key={ meal.idMeal }
              idMeal={ meal.idMeal }
              strMeal={ meal.strMeal }
              strMealThumb={ meal.strMealThumb }
              index={ index }
            />
            // </Link>
          )).slice(0, NUMBER_CARDS_INITIAL)
        }
      </div>
      <LowerMenu />
    </>
  );
}
