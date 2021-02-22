import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, getWeatherData } from './weatherSlice'
import styles from './Weather.module.css'
import amadsLogo from '../../img/amads-logo.png'
import { currentDate } from '../../helpers/helpers'

export function Weather() {
  const weather = useSelector(fetchWeather)
  const dispatch = useDispatch()
  const [postCode, setPostcode] = useState('')

  return (
    <div>
      <div>
        <img src={amadsLogo} alt='' />

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
      <div>
        <h1>London</h1>
      </div>
      <div>
        <h2>{currentDate()}</h2>
      </div>
      <div>
        <img src='' alt='' />
        <h2>11 °</h2>
      </div>

      <div>
        <p>7°/13°</p>
        <p>Feels Like: 11°</p>
      </div>

      <div>
        <h2>Clear</h2>
      </div>
    </div>
  )
}
