// import {GET_WEATHER} from '../types'

const initialState = {
    weather:[],
    loading:true
}

export default function weatherReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_WEATHER_DATA_SUCCESS':
            return {
                ...state,
                weather: action.payload,
                loading: false
            }

        default: 
            return state
    }

}