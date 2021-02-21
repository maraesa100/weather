import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

interface WeatherState {
  loading: boolean
  data: {}
  hasErrors: boolean
}

const initialState: WeatherState = {
  loading: false,
  data: {},
  hasErrors: false
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeather: state => {
      state.loading = true
    },
    getWeatherSuccess: (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.hasErrors = false
    },
    getWeatherFailure: state => {
      state.loading = false
      state.hasErrors = true
    }
  }
})

export const {
  getWeather,
  getWeatherSuccess,
  getWeatherFailure
} = weatherSlice.actions

export function getWeatherData(postcode: string): AppThunk {
  return async (dispatch: any) => {
    dispatch(getWeather())
    try {
      const response = await fetch(
        'http://localhost:3030/locations?postcode=' + postcode
      )
      const data = await response.json()
      dispatch(getWeatherSuccess(data))
    } catch (error) {
      dispatch(getWeatherFailure())
    }
  }
}

export const fetchWeather = (state: RootState) => state.weather.data

export default weatherSlice.reducer
