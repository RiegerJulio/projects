import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  handleChange = ({ target }) => {
    const { addSong, song } = this.props;
    addSong(song, target);
  }

  render() {
    const { song: { trackName, previewUrl, trackId }, checked } = this.props;
    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ `track-${trackId}` }>
          <input
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
