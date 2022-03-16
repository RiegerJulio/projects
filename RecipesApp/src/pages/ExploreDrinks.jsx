import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { fetchRandomDrink } from '../services/fetchApi';

export default function ExploreFoods() {
  const history = useHistory();

  const handleRandom = async () => {
    const response = await fetchRandomDrink();
    console.log(response);
    const drinkID = response.idDrink;
    history.push(`/drinks/${drinkID}`);
  };

  return (
    <>
      <Header title="Explore Drinks" />
      <div>
        <Link to="/explore/drinks/ingredients">
          <span data-testid="explore-by-ingredient">By Ingredient</span>
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
