import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, namePlayer, score } = this.props;

    return (
      <header>
        <img src={ avatar } alt="Imagem Avatar" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ namePlayer }</h4>
        <h6 data-testid="header-score">{ score }</h6>
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
