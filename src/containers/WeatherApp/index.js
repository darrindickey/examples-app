import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getWeather } from './../../actions/weatherActions';
import './../../App.css';

const fetchItems = () => dispatch => {
  try {
    dispatch(getWeather());
  } catch (error) {
    console.log('error', error)
  }
}

function WeatherApp({weatherData, currentWeather, dailyWeather}) {
  const dispatch = useDispatch();

  let currentTemp = '';

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch]);

  if (currentWeather) {
    console.log('currentWeather', currentWeather)
    currentTemp = Math.round(currentWeather.temp);
  }

  return(
    <div className="page-body">
      <h2>Weather App</h2>
      <div>{currentTemp}</div>
    </div>
  )
}

WeatherApp.propTypes = {
  getWeather: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    weatherData: state.weather,
    currentWeather: state.weather.weather.current,
    dailyWeather: state.weather.weather.daily
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeather: () => { dispatch(getWeather()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);