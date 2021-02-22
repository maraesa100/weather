import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'

interface WeatherState {
  loading: boolean
  postcodeData: {}
  hasErrors: boolean
  hasWeatherData: boolean
  errorMessage: string
  weatherData: {
    name: string

    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
    }
  }
}

const initialState: WeatherState = {
  loading: false,
  postcodeData: {},
  hasErrors: false,
  hasWeatherData: false,
  errorMessage: '',
  weatherData: {
    name: '',

    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0
    }
  }
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
      state.hasWeatherData = true
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
    setTimeout(() => {
      // mocks API delay
      axios
        .get(
          'http://localhost:3030/locations?postcode=' + postcode.toUpperCase(),
          {}
        )
        .then(res => {
          dispatch(getPostcodeSuccess(res.data[0]))
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
              dispatch(getWeatherSuccess(result.data[0]))
            })
            .catch(error => {
              dispatch(getWeatherFailure(error.message))
            })
          // end chained api request
        })
        .catch(err => {
          dispatch(getWeatherFailure(err.message))
        })
    }, 1000)
  }
}

export const weatherObj = (state: RootState) => state.weather.weatherData
export const hasWeather = (state: RootState) => state.weather.hasWeatherData
export const weatherRequestLoading = (state: RootState) => state.weather.loading

export default weatherSlice.reducer
