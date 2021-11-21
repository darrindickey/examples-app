import React from 'react';
import './../../App.css';

function Home() {
  return (
    <section className="page-body home">
      <div className="intro-wrapper">
        <div className="intro-text">
          <div className="greeting">Howdy!</div>
          <div className="greeting-text">My name is</div>
          <h1>Darrin Dickey</h1>
          <div className="intro-text">
            I am a software engineer. I've been building and maintaining web applications, APIs, and microservices for a healthcare IT company for more than seven years. Before that, I was the website developer for a local advertising agency.
            <br />

          </div>
        </div>
        <div className="intro-image-container">
          <img className="intro-image" src = "undraw_Developer_activity_re_39tg.svg" alt="Developer activity illustration"/>
        </div>
      </div>
      <section>
        <h2 className="skills-title">Skills</h2>
        <div className="skills-container">
          <div className="skills-image-wrapper">
            <img className="skills-image" src = "undraw_percentages_0rur.svg" alt="Percentages illustration"/>
          </div>
          <div className="skills-wrapper">
            <div className="skills-lists">
              <div className="skills-list">
                <h3>Skills I Use Regularly</h3>
                  <ul>
                    <li>JavaScript</li>
                    <li>NodeJS</li>
                    <li>ReactJS</li>
                    <li>ExpressJS</li>
                    <li>Webpack</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Jira</li>
                    <li>Git</li>
                  </ul>
              </div>
              <div className="skills-list">
                <h5>Other Skills I've Used In The Past</h5>
                  <ul>
                    <li>PHP</li>
                    <li>Ruby on Rails</li>
                    <li>C#</li>
                    <li>Angular 1.0</li>
                    <li>WordPress</li>
                    <li>Joomla</li>
                    <li>Drupal</li>
                    <li>Expression Engine</li>
                    <li>SharePoint</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Home;