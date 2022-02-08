import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpenses } from '../actions';
import SelectForm from './SelectForm';
import InputForm from './InputForm';

import imgWallet from '../images/imgWallet.png';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Expenses extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { getExpenses, expenses } = this.props;
    const newEntry = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (value !== '' || description !== '') {
      getExpenses(newEntry);
    } else {
      console.error('error');
    }
    this.setState(INITIAL_STATE);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className="form-left">
        <h1 className="logo">RiegerWallet</h1>
        <img src={ imgWallet } alt="wallet-img" className="imgWallet" />
        <InputForm
          label="Valor"
          name="value"
          testid="value-input"
          type="number"
          onChange={ this.handleChange }
          value={ value }
        />
        <InputForm
          label="Descrição"
          name="description"
          testid="description-input"
          type="text"
          onChange={ this.handleChange }
          value={ description }
        />
        <SelectForm
          label="Moeda"
          name="currency"
          testid="currency-input"
          options={ currencies }
          onChange={ this.handleChange }
          value={ currency }
          id="currencyInput"
        />
        <SelectForm
          label="Método de pagamento"
          name="method"
          testid="method-input"
          options={ payments }
          onChange={ this.handleChange }
          value={ method }
          id="method-id"
        />
        <SelectForm
          label="Tag"
          name="tag"
          testid="tag-input"
          options={ tags }
          onChange={ this.handleChange }
          value={ tag }
          id="tag-id"
        />
        <button
          className="btn btn-danger"
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(fetchExpenses(expenses)),
});

Expenses.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
