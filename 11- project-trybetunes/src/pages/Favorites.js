import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import './css/favorites.css';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs = () => {
    this.setState({ loading: true });
    getFavoriteSongs().then((favSongs) => this.setState({
      favList: favSongs,
      loading: false,
    }));
  }

  render() {
    const { favList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? (<Loading />
          ) : (
            <div>
              {favList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  song={ music }
                  checked={ favList.some(({ trackId }) => trackId === music.trackId) }
                />
              ))}
            </div>
          )
        }
      </div>
    );
  }
}
