import React from 'react'

const FewCities = (props) => {
  const { cities } = props
  return (
    <div>
      {cities.map((city) => (
        <div key={city.id} className="p-4 text-center">
          {`${city.name}, ${city.sys.country}`}
        </div>
      ))}
    </div>
  )
}

export default FewCities
