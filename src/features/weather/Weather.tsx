import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, getWeatherData } from './weatherSlice'
import styles from './Weather.module.css'

export function Weather() {
  const getWeather = useSelector(fetchWeather)
  const dispatch = useDispatch()
  const [postCode, setPostcode] = useState('')

  return (
    <div>
      <input
        type='text'
        name='postcode_input'
        id=''
        onChange={e => setPostcode(e.target.value)}
        placeholder='M5 3AA'
      />
      <button onClick={() => dispatch(getWeatherData(String(postCode)))}>
        Get Weather
      </button>
    </div>
  )
}
