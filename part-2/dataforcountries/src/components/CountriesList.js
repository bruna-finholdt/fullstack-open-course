import React from 'react'
import SingleCountry from './SingleCountry';

const CountriesList = ({ countries }) => {

  if (countries.length > 10) {
    return <div>too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  }
  
  return (
    <div>
      {countries.map((country, index) => (
     <div key={index}>{country.name.common}</div>
    ))}
    </div>
  )
}

export default CountriesList


