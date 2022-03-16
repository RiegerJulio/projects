import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoritesRecipes() {
  const [storeFavoriteRecipes, setStoreFavoriteRecipes] = useState([]);
  const [verify, setVerify] = useState(false);
  const [wordFilter, setWordFilter] = useState('');
  const history = useHistory();

  const myFunc = async () => {
    const getFavoriteRecipes = await getLocalStorage('favoriteRecipes');
    return getFavoriteRecipes !== null
      && setStoreFavoriteRecipes([...getFavoriteRecipes]);
  };

  useEffect(() => {
    myFunc();
  }, []);

  const functionShare = (item, id) => {
    copy(`http://localhost:3000/${item}s/${id}`);
    setVerify(!verify);
  };

  const redirectToRecipe = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

  const favorDisfavorButton = (index) => {
    const disfavor = storeFavoriteRecipes.filter((a, ind) => ind !== index);
    setStoreFavoriteRecipes([...disfavor]);
    setLocalStorage('favoriteRecipes', disfavor);
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setWordFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setWordFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setWordFilter('drink') }
      >
        Drinks
      </button>
      {
        (storeFavoriteRecipes !== undefined && storeFavoriteRecipes.length > 0)
        && storeFavoriteRecipes
          .filter((val) => {
            if (wordFilter !== '') {
              return val.type === wordFilter;
            }
            return val;
          })
          .map((item, index) => (
            <section key={ index }>
              <button
                type="button"
                onClick={ () => redirectToRecipe(item.id, item.type) }
                src={ item.image }
              >
                <img
                  src={ item.image }
                  alt="description"
                  style={ { width: '200px' } }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                <span>{item.nationality}</span>
                {' - '}
                <span>{item.alcoholicOrNot || item.category}</span>
              </p>
              <Link
                data-testid={ `${index}-horizontal-name` }
                to={ `${item.type}s/${item.id}` }
              >
                {item.name}
              </Link>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                onClick={ () => functionShare(item.type, item.id) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {
                verify
                && <p>Link copied!</p>
              }
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src="src/images/blackHeartIcon.svg"
                onClick={ () => favorDisfavorButton(index) }
              >
                <img src={ blackHeartIcon } alt="favoriteIcon" />
              </button>
            </section>
          ))
      }
    </>
  );
}

export default FavoritesRecipes;
