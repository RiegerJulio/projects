import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';

class TableExpenses extends Component {
  deleteExpense = ({ target }) => {
    const { expenses, newExpenses } = this.props;
    newExpenses(expenses.filter(({ id }) => id !== Number(target.id)));
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-content">
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(({ id, description, method, tag, value, currency, exchangeRates,
            }) => (
              <tr key={ id }>
                <td>{ value }</td>
                <td>{ description }</td>
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ method }</td>
                <td>{ tag }</td>
                <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>{ (value * Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    className="btn btn-dark"
                    data-testid="delete-btn"
                    type="button"
                    onClick={ (event) => this.deleteExpense(event) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpenses: (expenses) => dispatch(updateExpenses(expenses)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  newExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
