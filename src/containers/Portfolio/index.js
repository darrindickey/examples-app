import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="page-body portfolio">
      <div className="body-header">
        <h2>Portfolio</h2>
      </div>
      <div className="body-content">
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
    </section>
  );
}

export default Portfolio;