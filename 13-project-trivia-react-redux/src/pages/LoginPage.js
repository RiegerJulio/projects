import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { createUser,
  createToken, createAvatar } from '../redux/actions/index';
import { fetchToken } from '../services/fetchAPI';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      validation: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.btnValidation());
  }

  btnValidation = () => {
    const { name, gravatarEmail } = this.state;
    if (name && gravatarEmail) {
      this.setState({
        validation: false,
      });
    } else {
      this.setState({
        validation: true,
      });
    }
  }

  handleClick = async () => {
    const { name, assertions, score, gravatarEmail } = this.state;
    const { dispatchLoginInfo,
      dispatchToken, dispatchAvatar, history } = this.props;
    dispatchLoginInfo(name, assertions, score, gravatarEmail);
    dispatchToken(await fetchToken());
    const convertEmail = md5(gravatarEmail).toString();
    const imgAvatar = (`https://www.gravatar.com/avatar/${convertEmail}`);
    dispatchAvatar(imgAvatar);
    const playerInfo = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    };
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
    history.push('/game');
  }

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, gravatarEmail, validation } = this.state;

    return (
      <form>
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="input-name"
            onChange={ this.handleChange }
            value={ name }
            name="name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="input-email"
            onChange={ this.handleChange }
            value={ gravatarEmail }
            name="gravatarEmail"
          />
        </label>
        <button
          type="button"
          disabled={ validation }
          data-testid="btn-play"
          onClick={ () => this.handleClick() }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.btnSettings }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginInfo: (name, assertions, score,
    gravatarEmail) => dispatch(createUser(name, assertions, score, gravatarEmail)),
  dispatchToken: (token) => dispatch(createToken(token)),
  dispatchAvatar: (avatar) => dispatch(createAvatar(avatar)),
});

LoginPage.propTypes = {
  dispatchLoginInfo: PropTypes.func,
  dispatchToken: PropTypes.func,
  dispatchAvatar: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(null, mapDispatchToProps)(LoginPage);
