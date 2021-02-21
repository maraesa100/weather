import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'

interface WeatherState {
  loading: boolean
  postcodeData: {}
  hasErrors: boolean
  errorMessage: string
  weatherData: {}
}

const initialState: WeatherState = {
  loading: false,
  postcodeData: {},
  hasErrors: false,
  errorMessage: '',
  weatherData: {}
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeather: state => {
      state.loading = true
    },
    getPostcodeSuccess: (state, { payload }) => {
      state.postcodeData = payload
      state.loading = false
      state.hasErrors = false
    },
    getWeatherSuccess: (state, { payload }) => {
      state.weatherData = payload
      state.loading = false
      state.hasErrors = false
    },
    getWeatherFailure: (state, { payload }) => {
      state.errorMessage = payload
      state.loading = false
      state.hasErrors = false
    }
  }
})

export const {
  getWeather,
  getPostcodeSuccess,
  getWeatherFailure,
  getWeatherSuccess
} = weatherSlice.actions

export function getWeatherData(postcode: string): AppThunk {
  return (dispatch: any) => {
    dispatch(getWeather())

    axios
      .get(
        'http://localhost:3030/locations?postcode=' + postcode.toUpperCase(),
        {}
      )
      .then(res => {
        dispatch(getPostcodeSuccess(res.data))
        // start chained api request
        axios
          .get(
            'http://localhost:3030/weather/?coord.lon=' +
              res.data[0].longitude.toFixed(2) +
              '&coord.lat=' +
              res.data[0].latitude.toFixed(2),
            {}
          )
          .then(result => {
            dispatch(getWeatherSuccess(result.data))
          })
          .catch(error => {
            dispatch(getWeatherFailure(error.message))
          })
        // end chained api request
      })
      .catch(err => {
        dispatch(getWeatherFailure(err.message))
      })
  }
}

export const fetchWeather = (state: RootState) => state.weather.postcodeData

export default weatherSlice.reducer
