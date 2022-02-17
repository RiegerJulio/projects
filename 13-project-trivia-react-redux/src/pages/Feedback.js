import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
      return (<h1 data-testid="feedback-text">Could be better...</h1>);
    } if (assertions >= THREE_POINTS) {
      return (<h1 data-testid="feedback-text">Well Done!</h1>);
    }
  }

  render() {
    const localStorageInfo = JSON.parse(localStorage.getItem('playerInfo'));
    const { player: { assertions, score } } = localStorageInfo;
    return (
      <section>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        { this.feedbackMessage() }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.clickPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.clickRanking }
        >
          Ranking
        </button>
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
