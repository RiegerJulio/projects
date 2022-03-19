import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import MyContext from '../Context/MyContext';
import '../App.css';

function reduceArrayForIngredients(array, item) {
  return array.reduce((data, key) => {
    const str = item[0][key];
    const condition = (key.includes('strIngredient') && str !== '' && str !== null);
    return (condition) ? data.concat(str) : data;
  }, []);
}

function reduceArrayForMeasures(array, item) {
  return array.reduce((data, key) => {
    const str = (
      item[0][key] !== ' ' && item[0][key] !== null
    ) ? item[0][key] : '';
    const condition = key.includes('strMeasure');
    return (condition) ? data.concat(str) : data;
  }, []);
}

export default function IngredientsList() {
  const { itemRecovered } = useContext(MyContext);
  const { id } = useParams();
  const [list, setList] = useState([]);
  // const [render, setRender] = useState();
  const [ingredientsStore, setIngredientsStore] = useState([]);
  const history = useHistory();
  const typeOfRecipe = history.location.pathname.split('/')[1];
  const type = typeOfRecipe === 'drinks' ? 'cocktails' : 'meals';

  // const verifyRender = () => {
  //   const storage = {
  //     meals: {},
  //     cocktails: {},
  //   };
  //   const inProgressRecipes = getLocalStorage('inProgressRecipes');
  //   if (inProgressRecipes === null) {
  //     return setRender(true);
  //   }
  //   // const createInProgressRecipes = setLocalStorage('inProgressRecipes', storage);
  //   if (render) {
  //     setRender(false);
  //     console.log('alterando render');
  //     return setLocalStorage('inProgressRecipes', storage);
  //   }
  // };

  useEffect(() => {
    const keys = Object.keys(itemRecovered[0]);
    const ingredientsName = reduceArrayForIngredients(keys, itemRecovered);
    const measures = reduceArrayForMeasures(keys, itemRecovered);
    const ingredients = ingredientsName.map((name, index) => ({
      name,
      measure: measures[index],
      checked: false,
    }));
    setList(ingredients);
    // verifyRender();
  }, [itemRecovered]);

  const handleCheckBox = (target) => {
    const { value, checked } = target;
    console.log(target);
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (checked === true) {
      const newStorage = {
        ...inProgressRecipes,
        [type]: {
          ...inProgressRecipes[type],
          [id]:
            inProgressRecipes[type][id] === undefined
              ? [value]
              : [...inProgressRecipes[type][id], value],
        },
      };
      setIngredientsStore([...ingredientsStore, value]);
      return setLocalStorage('inProgressRecipes', newStorage);
    }
    const newStorage = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id]:
          inProgressRecipes[type][id].filter((item) => item !== value),
      },
    };
    setIngredientsStore(ingredientsStore.filter((item) => item !== value));
    return setLocalStorage('inProgressRecipes', newStorage);
  };

  const checkIngredientsInStorage = (name) => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes === null) {
      return false;
    }
    return inProgressRecipes[type][id]
      ? inProgressRecipes[type][id].some((item) => item.includes(name)) : false;
  };

  return (
    <section>
      {
        list.map((ingredient, index) => {
          const { name, measure } = ingredient;
          return (
            <p>
              <label
                key={ index }
                htmlFor={ index }
                className={ checkIngredientsInStorage(name)
                  ? 'selection_label line-through' : 'selection_label' }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  id={ index }
                  key={ index }
                  type="checkbox"
                  checked={ checkIngredientsInStorage(name) }
                  onChange={ (e) => {
                    handleCheckBox(e.target);
                  } }
                  value={ `${name}-medida-${measure}` }
                />
                <span>{`${name}${' - '}${measure}`}</span>
              </label>
            </p>
          );
        })
      }
    </section>
  );
}
IngredientsList.propTypes = {
  itemRecovered: PropTypes.object,
}.isRequired;
