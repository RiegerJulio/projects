import React, { Component } from 'react';
import Header from '../components/Header';

import './css/profile.css';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="profile-container">
          <span className="building-message">Em construção</span>
          <div className="spinner-border text-success spinner-building" role="status">
            {/* <span className="sr-only">Carregando...</span> */}
          </div>
        </div>
      </>
    );
  }
}
