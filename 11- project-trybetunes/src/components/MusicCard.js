import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../pages/css/favorites.css';

export default class MusicCard extends Component {
  handleChange = ({ target }) => {
    const { addSong, song } = this.props;
    addSong(song, target);
  }

  render() {
    const { song: { trackName, previewUrl, trackId }, checked } = this.props;
    return (
      <div className="music-box">
        <span className="track-name">{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ `track-${trackId}` }>
          <span>Favoritar</span>
          <input
            className="checkbox"
            type="checkbox"
            checked={ checked }
            value={ trackId }
            onChange={ this.handleChange }
            id={ `track-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  addSong: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
