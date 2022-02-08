import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../actions';

import imgWallet from '../images/imgWallet.png';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatchEmail } = this.props;
    dispatchEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    let VALIDATION = true;

    if (email.includes('@' && '.com') && password.length >= PASSWORD_LENGTH) {
      VALIDATION = false;
    } else {
      VALIDATION = true;
    }

    return (
      <div className="login-container">
        <h1 className="logo">RiegerWallet</h1>
        <img src={ imgWallet } alt="wallet-img" className="imgWallet" />
        <form onSubmit={ this.handleSubmit } className="input-fields">
          <span>Email</span>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <span>Senha</span>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              id="password"
              type="password"
              name="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="btn btn-danger"
            disabled={ VALIDATION }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (value) => dispatch(getUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);
