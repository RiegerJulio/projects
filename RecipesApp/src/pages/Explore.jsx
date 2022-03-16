import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function Explore() {
  return (
    <>
      <Header title="Explore" />
      <div>
        <Link to="/explore/foods">
          <span data-testid="explore-foods">Explore Foods</span>
        </Link>
        <Link to="/explore/drinks">
          <span data-testid="explore-drinks">Explore Drinks</span>
        </Link>
      </div>
      <LowerMenu />
    </>
  );
}
