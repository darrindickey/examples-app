import { 
  GET_WEATHER_DATA_SUCCESS,
  GET_WEATHER_DATA_ERROR,
  GET_LOCATION,
  GET_GEOCODE_DATA_SUCCESS,
  GET_GEOCODE_DATA_ERROR
} from './actionTypes';
import axios from 'axios';

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

const getGeocodeSuccess = (geolocation) => {
  return {
    type: GET_GEOCODE_DATA_SUCCESS,
    payload: geolocation
  }
}

const getGeocodeError = (error) => {
  return {
    type: GET_GEOCODE_DATA_ERROR,
    payload: error
  }
}

export const getLocationAction = (position) => {
  return dispatch => {
    dispatch({
      type: GET_LOCATION,
      payload: position
    });
  }
}

export const getBrowserPosition = () => {
  return dispatch => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      dispatch({
        type: GET_LOCATION,
        payload: position
      });
    });
  }
};

export const getWeather = (lat,lon) => {
  const key = process.env.REACT_APP_WEATHER_API_KEY;

  let units = 'imperial';
  if (!lat || !lon) {
    lat = '35.851234';
  lon = '-86.452170';
  }
  let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key + "&units=" + units;
  return (dispatch) => {
    axios.get(url)
      .then(response => {
        const weather = response.data;

        dispatch(getWeatherSuccess(weather));
      })
      .catch(error => {
        console.log('api error', error)
        const errorMsg = error.message;
        dispatch(getWeatherError(errorMsg));
      })
  }
}

export const geocodeLocation = (location) => {
  const key = process.env.REACT_APP_MAPQUEST_API_KEY;

  let url = 'http://open.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + location;

  return (dispatch) => {
    
    axios.get(url)
      .then(response => {
        const geolocation = response.data;
        dispatch(getGeocodeSuccess(geolocation));
      })
      .catch(error => {
        console.log('api error', error)
        const errorMsg = error.message;
        dispatch(getGeocodeError(errorMsg));
      })
  }

}