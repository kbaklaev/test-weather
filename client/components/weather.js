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

function Weather(props) {
  const [weatherState, setWeatherState] = useState(initialObject)
  const { city } = props

  useEffect(() => {
    if (city !== '') {
      Axios.get(`http://localhost:3000/api/weather/${city}`)
        .then((data) => setWeatherState(data.data))
        .catch((err) => err)
    }
  }, [city])

  if (weatherState !== initialObject) {
    // eslint-disable-next-line no-console
    console.log(weatherState)
    return (
      <div>
        <div className="text-center pb-4">
          {`${weatherState.name}, ${weatherState.sys.country}`}
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-3">
          <div className={weatherState.name && borderStyle}>
            <div className="grid col-span-2">
              {ASCII[weatherState.weather[0].icon.slice(0, -1)]}
            </div>
            <div className="grid col-span-1">
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
      </div>
    )
  }
  return <div />
}

export default Weather
