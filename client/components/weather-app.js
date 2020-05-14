import React, { useState } from 'react'

import Weather from './weather'

const port = process.env.PORT

const WeatherApp = () => {
  const [cityState, setCityState] = useState('')
  const [cityStateToProps, setCityStateToProps] = useState('')

  const changeCity = (e) => {
    setCityState(e.target.value)
  }

  const onSubmit = () => {
    setCityStateToProps(cityState)
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
        />
        <button
          type="button"
          className="ml-2 h-12 p-2 border-solid border-2 border-gray-500"
          onClick={() => onSubmit(cityState)}
        >
          START
        </button>
      </div>
      <div className="pt-4">
        <Weather city={cityStateToProps} />
      </div>
      <div>{`port is ${port}`}</div>
    </div>
  )
}

export default WeatherApp
