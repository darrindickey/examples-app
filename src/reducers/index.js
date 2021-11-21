import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  data: weatherReducer,
})

export default rootReducer