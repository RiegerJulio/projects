import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import InProgressDrinkComponent from '../components/InProgressDrinkComponent';
import { fetchDrinkDetailsId } from '../services/fetchApi';

export default function DrinksInProgress() {
  const {
    itemRecovered,
    setItemRecovered,
  } = useContext(MyContext);

  const history = useHistory();
  const idURLLocation = history.location.pathname.split('/')[2];
  // console.log(idURLLocation);

  useEffect(async () => {
    const recoverData = await fetchDrinkDetailsId(idURLLocation);
    setItemRecovered([recoverData]);
    // console.log(recoverData);
  }, []);

  return (
    <div>
      {
        itemRecovered.length > 0
        && itemRecovered.map((it, index) => (
          <InProgressDrinkComponent
            key={ index }
            index={ index }
            strDrink={ it.strDrink }
            strDrinkThumb={ it.strDrinkThumb }
            strCategory={ it.strCategory }
            strInstructions={ it.strInstructions }
          />
        ))
      }
    </div>
  );
}
