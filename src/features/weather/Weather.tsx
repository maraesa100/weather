import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  weatherObj,
  getWeatherData,
  hasWeather,
  weatherRequestLoading
} from './weatherSlice'
import styles from './Weather.module.css'

import { currentDate, fToC } from '../../helpers/helpers'

import amadsLogo from '../../img/amads-logo.png'

export function Weather() {
  const weather = useSelector(weatherObj)
  const weatherSuccess = useSelector(hasWeather)
  const weatherLoading = useSelector(weatherRequestLoading)
  const dispatch = useDispatch()
  const [postCode, setPostcode] = useState('')

  return (
    <div className={styles.container}>
      <img src={amadsLogo} alt='' className={styles.icon} />
      <h1>Weather App</h1>

      <div>
        <input
          type='text'
          name='postcode_input'
          id=''
          onChange={e => setPostcode(e.target.value)}
          placeholder='M5 3AA'
        />
      </div>
      <button onClick={() => dispatch(getWeatherData(String(postCode)))}>
        Get Weather
      </button>
      {weatherLoading && !weatherSuccess && <div>Loading</div>}
      <div>
        <h2>{currentDate()}</h2>
      </div>
      {weatherSuccess && (
        <div>
          <h2>{weather.name}</h2>
          <h2>{fToC(weather.main.temp)}°C</h2>
          <img src='' alt='' />
          <p>
            {fToC(weather.main.temp_min)}°C / {fToC(weather.main.temp_max)}°C
          </p>
          <p>Feels Like: {fToC(weather.main.feels_like)}°C</p>
        </div>
      )}
    </div>
  )
}
