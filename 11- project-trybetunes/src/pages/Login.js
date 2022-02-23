import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './css/login.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loginCheck: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loginCheck: true,
    });
  };

  render() {
    const { name, loading, loginCheck } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? (
          <Loading />
        ) : (
          <div className="login-page">
            <h1 className="spotify">iSpotifai</h1>
            <form className="form-input">
              <p className="login-text">Login</p>
              <label htmlFor="username">
                <input
                  className="input-field"
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <button
                className="btn btn-outline-light"
                type="submit"
                data-testid="login-submit-button"
                disabled={ name.length <= 2 }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {
          loginCheck ? <Redirect to="/search" /> : ''
        }
      </div>
    );
  }
}
