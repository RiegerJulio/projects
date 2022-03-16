import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import InProgressFoodComponent from '../components/InProgressFoodComponent';
import { fetchMealDetailsId } from '../services/fetchApi';

export default function FoodsInProgress() {
  const {
    itemRecovered,
    setItemRecovered,
  } = useContext(MyContext);

  const history = useHistory();
  const idURLLocation = history.location.pathname.split('/')[2];
  console.log(idURLLocation);

  useEffect(async () => {
    const recoverData = await fetchMealDetailsId(idURLLocation);
    setItemRecovered([recoverData]);
    // console.log(recoverData);
  }, []);

  return (
    <div>
      {
        itemRecovered.length > 0
        && itemRecovered.map((it, index) => (
          <InProgressFoodComponent
            key={ index }
            index={ index }
            strMeal={ it.strMeal }
            strMealThumb={ it.strMealThumb }
            strCategory={ it.strCategory }
            strInstructions={ it.strInstructions }
          />
        ))
      }
    </div>
  );
}
