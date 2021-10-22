import { GET_WEATHER_REQUEST, GET_WEATHER_DATA_SUCCESS, GET_WEATHER_DATA_ERROR } from './actionTypes';
import axios from 'axios';
// import * as actionTypes from './actionTypes';

const getWeatherRequest = (data) => {
  return {
    type: GET_WEATHER_REQUEST,
  }
}

const getWeatherSuccess = (weather) => {
  return {
    type: GET_WEATHER_DATA_SUCCESS,
    payload: weather
  }
}

const getWeatherError = (error) => {
  return {
    type: GET_WEATHER_DATA_ERROR,
    payload: error
  }
}

export const getWeather = () => {
  let key = process.env.REACT_APP_WEATHER_API_KEY;
  // let exclude = '';
  // let part = '';
  let units = 'imperial';
  let lat = '35.851234';
  let lon = '-86.452170';
  let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key + "&units=" + units

  return (dispatch) => {
    axios.get(url)
      .then(response => {
        dispatch(getWeatherRequest(response))
        const weather = response.data
        dispatch(getWeatherSuccess(weather));
      })
      .catch(error => {
        console.log('api error', error)
        const errorMsg = error.message
        dispatch(getWeatherError(errorMsg));
      })
  }
}