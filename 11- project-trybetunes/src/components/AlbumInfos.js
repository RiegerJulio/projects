import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumInfos extends Component {
  render() {
    const { album: { artistName, collectionName, artworkUrl100 } } = this.props;
    return (
      <div className="album-and-name">
        <h2 data-testid="artist-name" className="artist-name">{ artistName }</h2>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <img src={ artworkUrl100 } alt={ `Album ${collectionName}` } />
      </div>
    );
  }
}

AlbumInfos.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};
