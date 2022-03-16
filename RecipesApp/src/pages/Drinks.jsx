import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ButtonCategory from '../components/ButtonCategory';

import {
  fetchDrinks,
  fetchDrinksCategory } from '../services/fetchApi';

import MyContext from '../Context/MyContext';
import Search from '../components/Search';

export default function Drinks() {
  const { initialCategoriesDrink,
    requestApiDrinks,
    setDrinksArray,
    setKind,
    renderKind,
    redirectUniqueItem,
    choose,
  } = useContext(MyContext);

  const [categoryFilter, setCategoryFilter] = useState('');

  const NUMBER_CARDS_INITIAL = 12;
  const MAX_CATEGORIES_LENGHT = 5;

  const getFilter = async ({ target }) => {
    if (categoryFilter === null || categoryFilter !== target.id) {
      const category = target.id;
      const filterDrink = await fetchDrinksCategory(category);
      setDrinksArray(filterDrink);
      setCategoryFilter(category);
    } else {
      const drinks = await fetchDrinks();
      setDrinksArray(drinks);
    }
  };

  useEffect(() => {
    setKind('/drinks/');
  }, []);

  return (
    <>
      <Header title="Drinks" renderSearchBtn="true" />
      <Search />
      <div>Drinks</div>
      {
        initialCategoriesDrink.map((category, index) => (
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
        index="All"
        strCategory="All"
        func={ requestApiDrinks }
      />
      {
        renderKind().length === 1
          ? renderKind().map(() => redirectUniqueItem())
          : renderKind().map((item, index) => choose(item, index))
            .slice(0, NUMBER_CARDS_INITIAL)
      }
      <LowerMenu />
    </>
  );
}
