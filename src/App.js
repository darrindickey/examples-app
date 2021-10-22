import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './containers/Home';
import Portfolio from './containers/Portfolio';
import WeatherApp from './containers/WeatherApp';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/weather-app">
            <WeatherApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}