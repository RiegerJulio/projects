import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { getLocalStorage } from '../services/localStorage';

function Profile() {
  const history = useHistory();
  const Email = getLocalStorage('user') || { email: '' };

  const Logout = () => {
    // localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <h1>teste</h1>
      <Header title="Profile" />
      <div
        data-testid="profile-email"
      >
        { Object.values(Email) }
      </div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ Logout }
      >
        Logout
      </button>
      <LowerMenu />
    </div>
  );
}

export default Profile;
