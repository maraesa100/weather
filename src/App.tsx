import React from 'react'
import logo from './logo.svg'
import { Weather } from './features/weather/Weather'
import './App.css'

function App() {
  return (
    <div className='App'>
      <div className='weather-container'>
        <Weather />
      </div>
    </div>
  )
}

export default App
