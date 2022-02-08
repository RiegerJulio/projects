import { GET_CURRENCIES, GET_EXPENSES, UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { type, currencies, firstExpense, newExpense } = action;
  switch (type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, firstExpense],
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: newExpense,
    };
  default:
    return state;
  }
}

export default wallet;
