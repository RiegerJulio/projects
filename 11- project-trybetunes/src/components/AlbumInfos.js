import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AlbumInfos extends Component {
  render() {
    const { album: { artistName, collectionName } } = this.props;
    return (
      <div>
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h2 data-testid="album-name">{ collectionName }</h2>
      </div>
    );
  }
}

AlbumInfos.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  }).isRequired,
};
