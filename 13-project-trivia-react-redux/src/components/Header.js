import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../pages/css/game.css';

class Header extends React.Component {
  render() {
    const { avatar, namePlayer, score } = this.props;

    return (
      <header>
        <img
          src={ avatar }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
          className="gravatar-img"
        />
        <div>
          <h2 data-testid="header-player-name">
            {'Player: '}
            { namePlayer }
          </h2>
          <h2 data-testid="header-score">
            {'Score: '}
            { score }
          </h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  namePlayer: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  avatar: state.reducerAvatar,
  namePlayer: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
