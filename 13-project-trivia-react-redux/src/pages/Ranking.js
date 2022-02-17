import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  clickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
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
