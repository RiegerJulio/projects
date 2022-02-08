import fetchAPI from '../services/fetchApi';

export const GET_USER = 'GET_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const getUser = (email) => ({
  type: GET_USER,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const getExpenses = (firstExpense) => ({
  type: GET_EXPENSES,
  firstExpense,
});

export const updateExpenses = (newExpense) => ({
  type: UPDATE_EXPENSES,
  newExpense,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetchAPI();
    const data = Object.keys(response)
      .filter((currencie) => currencie !== 'USDT');
    dispatch(getCurrencies(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchExpenses = (expenses) => async (dispatch) => {
  try {
    const response = await fetchAPI();
    const attExpenses = {
      ...expenses,
      exchangeRates: response,
    };
    dispatch(getExpenses(attExpenses));
  } catch (error) {
    console.error(error);
  }
};
