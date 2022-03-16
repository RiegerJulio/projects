import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { fetchRandomMeal } from '../services/fetchApi';

export default function ExploreFoods() {
  const history = useHistory();

  const handleRandom = async () => {
    const response = await fetchRandomMeal();
    console.log(response);
    const foodID = response.idMeal;
    history.push(`/foods/${foodID}`);
  };

  return (
    <>
      <Header title="Explore Foods" />
      <div>
        <Link to="/explore/foods/ingredients">
          <span data-testid="explore-by-ingredient">By Ingredient</span>
        </Link>
        <Link to="/explore/foods/nationalities">
          <span data-testid="explore-by-nationality">By Nationality</span>
        </Link>
        {/* implementar logica abaixo */}
        <button
          type="button"
          onClick={ handleRandom }
        >
          <span data-testid="explore-surprise">Surprise me!</span>
        </button>
      </div>
      <LowerMenu />
    </>

  );
}
