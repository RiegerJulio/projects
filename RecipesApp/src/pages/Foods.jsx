import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ButtonCategory from '../components/ButtonCategory';

import {
  fetchMeals,
  fetchMealsCategory } from '../services/fetchApi';

import MyContext from '../Context/MyContext';
import Search from '../components/Search';

const NUMBER_CARDS_INITIAL = 12;
const MAX_CATEGORIES_LENGHT = 5;

export default function Foods() {
  const {
    setMealsArray,
    initialCategoriesFood,
    requestApiFoods,
    setKind,
    renderKind,
    choose,
    redirectUniqueItem,
    buttonValue,
    setButtonValue,
  } = useContext(MyContext);

  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    setKind('/foods/');
  }, []);

  const getFilter = async ({ target }) => {
    if (categoryFilter === null || categoryFilter !== target.id) {
      const a = target.id;
      setButtonValue(a);
      console.log(buttonValue);
      const filterMeals = await fetchMealsCategory(a);
      setMealsArray(filterMeals);
      setCategoryFilter(target.id);
    } else {
      const mealsApi = await fetchMeals();
      setMealsArray(mealsApi);
    }
  };

  return (
    <>
      <Header title="Foods" />
      <Search />
      <div>Foods</div>
      {
        initialCategoriesFood.map((category, index) => (
          <ButtonCategory
            key={ category.strCategory }
            strCategory={ category.strCategory }
            index={ index }
            func={ getFilter }
          />
        )).slice(0, MAX_CATEGORIES_LENGHT)
        // O método slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim (fim não é necessário) de um array original. O Array original não é modificado.
        // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      }
      <ButtonCategory
        strCategory="All"
        index="All"
        func={ requestApiFoods }
      />
      {
        renderKind().length === 1 && buttonValue === 'Search'
          ? renderKind().map(() => redirectUniqueItem())
          : renderKind().map((item, index) => choose(item, index))
            .slice(0, NUMBER_CARDS_INITIAL)
      }

      <LowerMenu />
    </>
  );
}
