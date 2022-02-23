import React from 'react';
import PropTypes from 'prop-types';
// import Header from '../components/Header';

import triviaLogo from '../images/trivia-logo.png';

import './css/feedback.css';

class Feedback extends React.Component {
  clickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  clickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  feedbackMessage = () => {
    const getScore = JSON.parse(localStorage.getItem('playerInfo'));
    const { player: { assertions } } = getScore;
    const THREE_POINTS = 3;
    if (assertions < THREE_POINTS) {
      return (
        <h1
          data-testid="feedback-text"
          className="feedback-message"
        >
          Could be better...
        </h1>);
    } if (assertions >= THREE_POINTS) {
      return (
        <h1
          className="feedback-message"
          data-testid="feedback-text"
        >
          Well Done!
        </h1>);
    }
  }

  render() {
    const localStorageInfo = JSON.parse(localStorage.getItem('playerInfo'));
    const { player: { assertions, score } } = localStorageInfo;

    return (
      <section className="feedback-section">
        <div className="feedback-container">
          <div className="header-feedback">
            <img src={ triviaLogo } className="img-logo" alt="teste" />
            {/* <Header /> */}
          </div>
          <div className="results-feedback">
            <h2 data-testid="feedback-text" className="results">Results</h2>
            <h3 data-testid="feedback-total-score">
              { 'Final Score: ' }
              { score }
            </h3>
            <h3 data-testid="feedback-total-question">
              { 'Final Assertions: '}
              { assertions }
            </h3>
            { this.feedbackMessage() }
          </div>
        </div>
        <div className="feedback-btn-container">
          <button
            className="btn waves-effect waves-light light-blue"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.clickPlayAgain }
          >
            Play Again
          </button>
          <button
            className="btn waves-effect waves-light light-blue"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.clickRanking }
          >
            Ranking
          </button>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
