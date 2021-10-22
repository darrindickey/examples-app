import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <div className="page-body">
      <h2>Portfolio</h2>
      <div className="portfolio-container">
        <div>This is where the magic resides.</div>
        <div className="portfolio-row-wrapper">
          <Link to="/weather-app">
            <div className="project-card">
              <h2>Weather Application</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;