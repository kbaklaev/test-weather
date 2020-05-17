import React, { useState } from 'react'

import Weather from './weather'

const WeatherApp = () => {
  const [cityState, setCityState] = useState('')
  const [cityStateToProps, setCityStateToProps] = useState('')

  const changeCity = (e) => {
    setCityState(e.target.value)
  }

  const onSubmit = () => {
    setCityStateToProps(cityState)
  }

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      setCityStateToProps(cityState)
    }
  }

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
        className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-3 pt-4"
      >
        <div className="grid sm:col-start-2 sm:col-end-5 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-5 xl:col-start-2 xl:col-end-2">
          <Weather city={cityStateToProps} />
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
