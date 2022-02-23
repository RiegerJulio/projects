import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions } from '../services/fetchAPI';
import { createToken } from '../redux/actions/index';
import Loader from '../components/Loader';
import QuestionsMap from '../components/QuestionsMap';
import Header from '../components/Header';

import triviaLogo from '../images/trivia-logo.png';

import './css/game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loader: true,
      indexQuestion: 0,
    };
  }

  componentDidMount() {
    this.mountQuestions();
  }

  mountQuestions = async () => {
    const MAGIC_RESPONSE = 3;
    const { currentToken, newToken } = this.props;
    const response = await fetchQuestions(currentToken);
    if (response.response_code === MAGIC_RESPONSE) {
      newToken(await fetchToken());
      this.mountQuestions();
    } else {
      this.setState({
        questions: [...response.results],
        loader: false,
      });
    }
  }

  indexQuestionUpdate = () => {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
    });
  }

  render() {
    const { questions, loader, indexQuestion } = this.state;
    const { history } = this.props;

    return (
      <div className="game-container">
        <div className="header-pc">
          <img src={ triviaLogo } className="img-logo-resize" alt="teste" />
          <Header />
        </div>
        {loader
          ? <Loader /> : (
            <QuestionsMap
              question={ questions[indexQuestion] }
              indexQuestion={ indexQuestion }
              updateIndexQuestion={ this.indexQuestionUpdate }
              history={ history }
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentToken: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  newToken: (token) => dispatch(createToken(token)),
});

Game.propTypes = {
  currentToken: PropTypes.string,
  newToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
