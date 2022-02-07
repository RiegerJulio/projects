import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

import '../pages/css/search.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    getUser().then(({ name }) => this.setState({ name, loading: false }));
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 data-testid="header-user-name" className="header-name">
              {`Bem vindo de volta, ${name}`}
            </h2>
            <nav>
              <Link
                data-testid="link-to-search"
                to="/search"
                className="link"
              >
                Pesquisar
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className="link"
              >
                Favoritos
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className="link"
              >
                Perfil
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }
}
