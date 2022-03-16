import React from 'react';
import { Link } from 'react-router-dom';

import drinkIMG from '../images/drinkIcon.svg';
import exploreIMG from '../images/exploreIcon.svg';
import foodIMG from '../images/mealIcon.svg';

export default function LowerMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIMG } alt="drink icon" data-testid="drinks-bottom-btn" />
        Drinks
      </Link>
      <Link to="/explore">
        <img src={ exploreIMG } alt="explore icon" data-testid="explore-bottom-btn" />
        Explore
      </Link>
      <Link to="/foods">
        <img src={ foodIMG } alt="food icon" data-testid="food-bottom-btn" />
        Foods
      </Link>
    </footer>
  );
}
