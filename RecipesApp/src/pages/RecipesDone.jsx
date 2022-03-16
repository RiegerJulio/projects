import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

import { getLocalStorage } from '../services/localStorage';

const copy = require('clipboard-copy');

function RecipesDone() {
  const [storeDoneRecipe, setStoreDoneRecipe] = useState([]);
  const [verify, setVerify] = useState(false);
  const [wordFilter, setWordFilter] = useState('');
  const history = useHistory();

  const myFunc = async () => {
    const getDoneRecipes = await getLocalStorage('doneRecipes');
    return getDoneRecipes !== null && setStoreDoneRecipe([...getDoneRecipes]);
  };

  useEffect(() => {
    myFunc();
  }, []);

  const functionShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setVerify(!verify);
  };

  const redirectToRecipe = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <>
      <Header title="Done Recipes" />
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
        storeDoneRecipe !== undefined
        && storeDoneRecipe
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
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => redirectToRecipe(item.type, item.id) }
              >
                <img
                  src={ item.image }
                  alt="description"
                  style={ { width: '200px' } }
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
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              {
                verify
                && <p>Link copied!</p>
              }
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                onClick={ () => functionShare(item.type, item.id) }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {
                item.tags !== undefined
                && item.tags.map((tag, ind) => (
                  <p
                    key={ ind }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))
              }
            </section>
          ))
      }
    </>
  );
}

export default RecipesDone;
