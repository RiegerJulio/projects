import React from 'react';
import PropTypes from 'prop-types';

import triviaLogo from '../images/trivia-logo.png';

import './css/ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const getFromStorage = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: getFromStorage,
    });
  }

  clickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;

    return (
      <section className="ranking-section">
        <img src={ triviaLogo } className="img-logo" alt="teste" />
        <h1 data-testid="ranking-title" className="ranking-text">Ranking</h1>
        <div className="ranking-container">
          <ul>
            { ranking.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={ `${player}-${index}` }>
                {/* <img src={ player.picture } alt="Imagem Avatar" /> */}
                <p data-testid={ `player-name-${index}` }>
                  { 'Player Name: '}
                  { player.name }
                </p>
                <p data-testid={ `player-score-${index}` }>
                  { 'Score: '}
                  { player.score }
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="btn waves-effect waves-light light-blue start-again-btn"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickPlayAgain }
        >
          Start Again
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
