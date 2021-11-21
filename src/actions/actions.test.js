// const getWeather = require ('./index');
const { getWeather } = require('../actions/weatherActions')
import axios from 'axios';
import mockData from '../utils/mockData';

jest.mock('axios');

it('returns weather response from API request', () => {
  const weatherData = mockData.mockWeatherResponse;
  axios.get.mockResolvedValue(weatherData);
  const weather = getWeather();
  expect(weatherData.timezone).toEqual("America/Chicago")
})