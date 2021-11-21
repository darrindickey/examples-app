import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { 
  getWeather,
  // getBrowserPosition,
  // getLocationAction,
  geocodeLocation
} from './../../actions/weatherActions';
import * as dataFormatter from './../../utils/dataFormatter';
import './../../App.css';
import _ from 'lodash';

function WeatherApp({geocodeLocationResponse, weatherData, currentWeather, dailyWeather}) {
  const dispatch = useDispatch();
  const [navigator, setNavigator] = useState(true);  // is browser geolocation available?
  const [location, setLocation] = useState('');  // value of location form field
  const [searchLocation, setSearchLocation] = useState({});

  let currentTemp = '';
  let currentTime = '';
  let currentFeel = '';
  let currentConditions = '';
  let currentWinds = '';
  let iconUrl;
  let forecastIconUrl;
  let dailyForecastArray = [];
  let dailyForecast = '';
  let searchLocationToShow;

  useEffect(() => {
    setNavigator(false);
  }, [])

  useEffect(() => {
    let geolocationResults = geocodeLocationResponse ? geocodeLocationResponse.results[0] : null;
    if (geolocationResults) {
      let parsedGeocodeLocation = dataFormatter.parseGeocodeResponse(geolocationResults);
      setSearchLocation({
        city: parsedGeocodeLocation.city,
        state: parsedGeocodeLocation.state
      })
      dispatch(getWeather(parsedGeocodeLocation.lat, parsedGeocodeLocation.lng));
    }
  }, [geocodeLocationResponse])

  const onChange = (event) => {
    setLocation(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(geocodeLocation(location));
  }

  if (currentWeather) {
    currentTime = dataFormatter.formatDateTimeFromUnix(currentWeather.dt);
    currentTemp = Math.round(currentWeather.temp);
    currentFeel = Math.round(currentWeather.feels_like);
    currentConditions = currentWeather.weather[0].main;
    currentWinds = Math.round(currentWeather.wind_speed);
    iconUrl = 'http://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '@2x.png';

    currentWeather = (
      <div className="current-weather">
        <h3>{currentTime}</h3>
        <h4>{currentConditions}</h4>
        <div>
          <img src={iconUrl} alt="weather icon" />
        </div>
        <div>Temperature: {currentTemp}&deg;</div>
        <div>Feels like: {currentFeel}&deg;</div>
        <div>Current wind: {currentWinds} mph</div>
      </div>
    )
  }

  if (dailyWeather) {
    dailyForecastArray = dailyWeather;
    dailyForecast = dailyForecastArray.slice(1,7).map((dayWeather, index) => {
      forecastIconUrl = 'http://openweathermap.org/img/wn/' + dayWeather.weather[0].icon + '@2x.png';
      return (
        <div className="weather-card"  key={index}>
          <div className="day">{dataFormatter.formatDayFromUnix(dayWeather.dt)}</div>
          <img src={forecastIconUrl} alt="forecast icon" />
          <div className="temp">High: {Math.round(dayWeather.temp.max)}</div>
          <div className="temp">High: {Math.round(dayWeather.temp.min)}</div>
        </div>
      )
    })
  }

  let noLocation = navigator || _.isArray(weatherData.weather) ? (
    <section className="no-location">
      <div className="no-location-greeting">Hello!</div>
      <div className="location-greeting-body">
        I am unable to fetch your location automatically. Would you like to enter the location for which you would like to know the weather?
      </div>
      <form className="location-form" onSubmit={onSubmit}>
        <input name="location" type="text" value={location} onChange={onChange} placeholder="City, ST or Zip" />
        <button type="submit" className="submit-button">How's the weather?</button>
      </form>
    </section>
  ) : null;

  if (searchLocation) {
    searchLocationToShow = searchLocation.city + ', ' + searchLocation.state;
  } else {
    searchLocationToShow = weatherData.geocodeLocationResponse.results[0].providedLocation.location
  }

  let searchLocationText = weatherData.geocodeLocationResponse ? (
    <section className="weather-location-wrapper">
      <div className="weather-location">
        Weather forecast for {searchLocationToShow}
      </div>
    </section>
  ) : null;

  return (
    <section className="page-body weather">
      <div className="body-header">
        <h2>Weather App</h2>
      </div>
      {searchLocationText}
      {noLocation}
      <section className="body-content main-weather">
        {currentWeather}
      </section>
      <section className="body-content forecast">
        {dailyForecast}
      </section>
    </section>
  )
}

WeatherApp.propTypes = {
  getWeather: PropTypes.func.isRequired,
  geocodeLocation: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    weatherData: state.data,
    geocodeLocationResponse: state.data.geocodeLocationResponse,
    currentWeather: state.data.weather.current,
    dailyWeather: state.data.weather.daily,
  }
}

const mapDispatchToProps = {
  getWeather,
  geocodeLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);