import React from 'react'
import SingleCountry from './SingleCountry';

const CountriesList = ({ countries,setSelectedCountry }) => {

  if (countries.length > 10) {
    return <div>too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  }
  
  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>{country.name.common}
        <button style={{borderRadius: '5px'}} onClick={() => setSelectedCountry(country)}>show</button>
        </div>
    ))}
    </div>
  )
}

export default CountriesList


