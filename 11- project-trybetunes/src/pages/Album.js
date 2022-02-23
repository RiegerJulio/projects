import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumInfos from '../components/AlbumInfos';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

import './css/album.css';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musicList: [],
      artistInfo: {},
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.ApiMusics();
    this.favoriteSongs();
  }

  // musics api retorna um array com elementos. o primeiro são as infos e o resto são as musicas. por isso usei o slice. e no info usei o indice 0 porque queria pegar as infos do album
  ApiMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const getMusic = await getMusics(id);
    const musicAlbum = getMusic.slice(1);
    const info = getMusic[0];
    this.setState({
      musicList: musicAlbum,
      artistInfo: info,
      loading: false,
    });
  };

  favoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        loading: false,
      });
    });
  };

  addSong = (song, target) => {
    const { checked } = target;
    const handleSong = checked ? addSong : removeSong;
    this.setState({ loading: true }, async () => {
      await handleSong(song);
      this.favoriteSongs();
    });
  };

  render() {
    const { loading, musicList, artistInfo, favoriteSongs } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <main data-testid="page-album" className="page-album">
            <AlbumInfos album={ artistInfo } />
            <div className="songs-container">
              {musicList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  song={ music }
                  addSong={ this.addSong }
                  checked={
                    favoriteSongs.some(({ trackId }) => trackId === music.trackId)
                  }
                />
              ))}
            </div>
          </main>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
