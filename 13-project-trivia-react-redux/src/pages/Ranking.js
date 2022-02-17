import React from 'react';
import PropTypes from 'prop-types';

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
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { ranking.sort((a, b) => b.score - a.score).map((player, index) => (
            <li key={ `${player}-${index}` }>
              <img src={ player.picture } alt="Imagem Avatar" />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickPlayAgain }
        >
          Login
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
