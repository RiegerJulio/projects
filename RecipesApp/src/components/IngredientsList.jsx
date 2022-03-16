import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList(props) {
  const {
    itemRecovered,
  } = props;
  // console.log(itemRecovered[0]);

  // Criação do array de ingredientes com o controle checked
  const createIngredientList = () => {
    const keys = Object.keys(itemRecovered[0]);
    // console.log(keys);
    const ingredientsName = keys.reduce((array, key) => {
      const str = itemRecovered[0][key];
      // console.log(str);
      const condition = (key.includes('strIngredient') && str !== '' && str !== null);
      return (condition) ? array.concat(str) : array;
    }, []);
    // console.log(ingredientsName);

    const measures = keys.reduce((array, key) => {
      const str = (
        itemRecovered[0][key] !== ' ' && itemRecovered[0][key] !== null
      ) ? itemRecovered[0][key] : '';
      const condition = key.includes('strMeasure');
      return (condition) ? array.concat(str) : array;
    }, []);
    // console.log(measures);

    const ingredients = ingredientsName.map((name, index) => ({
      name,
      measure: measures[index],
      checked: false,
    }));
    console.log(ingredients);
    return ingredients;
  };

  const list = createIngredientList();

  return (
    <div>
      {list.map((ingredient, index) => {
        const { name, measure, checked } = ingredient;
        return (
          <label
            key={ index }
            htmlFor={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ index }
              key={ index }
              type="checkbox"
              onChange={ ({ target }) => check({ target }, index) }
              checked={ checked }
              value={ `${name}-medida-${measure}` }
            />
            {`${name}${' - '}${measure}`}
          </label>
        );
      })}
    </div>
  );
}

IngredientsList.propTypes = {
  itemRecovered: PropTypes.object,
}.isRequired;
