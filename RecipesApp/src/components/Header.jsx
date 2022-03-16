import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';

export default function Header(props) {
  const { title } = props;

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile" src={ profileIcon }>
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile button" />
      </Link>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
