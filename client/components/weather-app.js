import React, { useState, useEffect } from 'react'

import Weather from './weather'

const WeatherApp = () => {
  const [cityState, setCityState] = useState(sessionStorage.getItem('city') || '')
  const [cityStateToProps, setCityStateToProps] = useState('')

  const changeCity = (e) => {
    setCityState(e.target.value)
  }

  const onSubmit = () => {
    setCityStateToProps(cityState)
    sessionStorage.setItem('city', cityState)
  }

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      setCityStateToProps(cityState)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('city')) setCityStateToProps(sessionStorage.getItem('city'))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="p-4 bg-gray-900 h-screen text-gray-500 font-mono">
      <div className="font-bold p-4 text-center">weather forecast</div>
      <div className="text-center pt-2">
        <input
          type="text"
          className="border-dashed border-2 border-gray-500 bg-gray-900"
          placeholder=" enter your city"
          value={cityState}
          onChange={(e) => changeCity(e)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button
          type="button"
          className="ml-2 h-12 p-2 border-solid border-2 border-gray-500"
          onClick={() => onSubmit(cityState)}
        >
          START
        </button>
      </div>
      <div
        id="weather_component"
        className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 pt-4"
      >
        <div className="col-span-1" />
        <div className="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
          <Weather city={cityStateToProps} />
          {/* {cityStateToProps} */}
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  )
}

export default WeatherApp
