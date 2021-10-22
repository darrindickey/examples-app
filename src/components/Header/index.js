import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo-container">
        <a className="header-link" href="/"> </a> 
      </div>
      <div className="menu-container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;