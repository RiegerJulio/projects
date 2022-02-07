import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumsResult from '../components/AlbumsResults';

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
              <label htmlFor="search-artist-input">
                <input
                  type="text"
                  name="input"
                  data-testid="search-artist-input"
                  value={ input }
                  onChange={ this.handleChange }
                />
                <input
                  type="button"
                  data-testid="search-artist-button"
                  value="Pesquisar"
                  disabled={ input.length <= 1 }
                  onClick={ this.handleSearch }
                />
              </label>
            </form>
            <h1>
              {content.length === 0 ? ''
                : `Resultado de álbuns de: ${content}`}
            </h1>
            Search
          </section>
        )}
        <main>{results ? fetchResults : ''}</main>
      </>
    );
  }
}
