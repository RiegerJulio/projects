import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

import Expenses from '../components/Expenses';
import TableExpenses from '../components/TableExpenses';

import './css/wallet.css';

class Wallet extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //   };
  // }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      acc += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
      return acc;
    }, 0);
  }

  render() {
    const { getUser } = this.props;
    return (
      <div className="wallet-page">
        <div className="right-content">
          <header>
            <p data-testid="email-field">{ getUser }</p>
            <p data-testid="header-currency-field">BRL</p>
            <p data-testid="total-field">{this.sumExpenses().toFixed(2)}</p>
            <p>Total:</p>
          </header>
          <section>
            <TableExpenses />
          </section>
        </div>
        <main className="expenses-table">
          <Expenses />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getUser: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  getUser: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
