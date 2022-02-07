import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumsResult from '../components/AlbumsResults';
import './css/search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      loading: false,
      albums: [],
      content: '',
      results: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSearch = async () => {
    this.setState({
      loading: true,
      // results: false,
    });
    const { input } = this.state;
    const album = input;
    const apiReturn = await searchAlbumsAPI(album);
    this.setState({
      loading: false,
      input: '',
      albums: apiReturn,
      content: album,
      results: true,
    });
  };

  render() {
    const { input, loading, albums, results, content } = this.state;
    const fetchResults = albums.length === 0
      ? 'Nenhum álbum foi encontrado' : <AlbumsResult albums={ albums } />;
    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <section data-testid="page-search">
            <form>
              <label htmlFor="search-artist-input" className="search-engine">
                <input
                  className="search-field"
                  type="text"
                  name="input"
                  data-testid="search-artist-input"
                  value={ input }
                  onChange={ this.handleChange }
                />
                <input
                  className="btn btn-outline-light"
                  type="button"
                  data-testid="search-artist-button"
                  value="Pesquisar"
                  disabled={ input.length <= 1 }
                  onClick={ this.handleSearch }
                />
              </label>
            </form>
            <h2 className="album-results">
              {content.length === 0 ? ''
                : `Resultado de álbuns de: ${content}`}
            </h2>
          </section>
        )}
        <main>{results ? fetchResults : ''}</main>
      </>
    );
  }
}
