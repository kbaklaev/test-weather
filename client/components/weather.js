/* eslint-disable no-console */
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

function Weather(props) {
  const [weatherState, setWeatherState] = useState(initialObject)
  const { city } = props

  useEffect(() => {
    if (city !== '') {
      Axios.get(`/api/weather/${city}`)
        .then((data) => setWeatherState(data.data))
        .catch((err) => console.log(err))
    }
  }, [city])

  if (weatherState !== initialObject) {
    return (
      <div>
        <div className="text-center pb-4">
          {`${weatherState.name}, ${weatherState.sys.country}`}
        </div>
        <div className="text-center pb-4">
          {new Date(weatherState.dt * 1000).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="grid grid-cols-2 border-dashed border-2 border-gray-500 pb-4 pt-4">
          <div className="col-span-1">{ASCII[weatherState.weather[0].icon.slice(0, -1)]}</div>
          <div className="col-span-1 text-center">
            {`temp: ${weatherState.main.temp.toFixed(1)} °С`}
            <br />
            {`pressure: ${weatherState.main.pressure}`}
            <br />
            {`humidity: ${weatherState.main.humidity} %`}
            <br />
            {`wind: ${weatherState.wind.speed.toFixed()} m/s`}
          </div>
        </div>
      </div>
    )
  }
  return <div />
}

export default Weather
