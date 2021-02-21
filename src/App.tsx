import React from 'react'
import logo from './logo.svg'
import { Weather } from './features/weather/Weather'
import './App.css'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Weather App</h1>
        <Weather />
      </header>
    </div>
  )
}

export default App
