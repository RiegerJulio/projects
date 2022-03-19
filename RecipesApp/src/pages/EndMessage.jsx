import React from 'react'
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import Search from '../components/Search';

import headerLogo from '../images/header-logo.png';

import './css/endMessage.css';

export default function EndMessage() {
  return (
    <div>
       <div className="header-container">
        <Header title="Search for Foods" />
        <img src={ headerLogo } alt="header logo" className="header-logo" />
        <Search />
      </div>
      <div className="end-message">
        <h1 className="header-title">
          Congratulations! You've Ended the Recipe.
        </h1>
      </div>
      <LowerMenu />
    </div>
  )
}
