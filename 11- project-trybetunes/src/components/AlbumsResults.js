import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../pages/css/search.css';

export default class AlbumsResult extends Component {
  render() {
    const { albums } = this.props;
    // albums é um array de objetos, não esquecer de colocar arrayof no proptypes
    const artists = albums.map(({ artistName, collectionId,
      collectionName, artworkUrl100,
    }) => (
      <Link
        key={ collectionId }
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="artist-result">
          <span className="artist-title">{ artistName }</span>
          <img
            src={ artworkUrl100 }
            alt={ `Album ${collectionName}` }
            className="album-art"
          />
          <span>{ collectionName }</span>
        </div>
      </Link>
    ));
    return (
      <div className="artist-gallery">
        {artists}
      </div>
    );
  }
}

AlbumsResult.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
