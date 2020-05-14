import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import ASCII from './weather-ascii-var'

const initialObject = {
  name: '',
  sys: {
    country: ''
  },
  weather: [
    {
      icon: ''
    }
  ],
  main: {
    temp: '',
    pressure: '',
    humidity: ''
  },
  wind: {
    speed: ''
  }
}

const borderStyle =
  'md:col-start-2 md:col-end-4 lg:col-start-2 lg:col-end-2 grid grid-cols-3 border-dashed border-2 border-gray-500 pb-4 pt-4'

const Weather = (props) => {
  const [weatherState, setWeatherState] = useState(initialObject)
  const { city } = props
  const url = `http://localhost:3000/api/weather/${city}`

  useEffect(() => {
    Axios.get(url)
      .then((data) => setWeatherState(data.data))
      .catch((err) => err)
  }, [city, url])

  return (
    <div>
      <div className="text-center pb-4">
        {weatherState.name && `${weatherState.name}, ${weatherState.sys.country}`}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-3">
        <div className={weatherState.name && borderStyle}>
          <div className="grid col-span-2">{ASCII[weatherState.weather[0].icon.slice(0, -1)]}</div>
          <div className="grid col-span-1">
            {weatherState.main.temp && `temp: ${weatherState.main.temp.toFixed(1)} °С`}
            <br />
            {weatherState.main.pressure && `pressure: ${weatherState.main.pressure}`}
            <br />
            {weatherState.main.humidity && `humidity: ${weatherState.main.humidity} %`}
            <br />
            {weatherState.wind.speed && `wind: ${weatherState.wind.speed.toFixed()} m/s`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
