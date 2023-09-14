import React from 'react'

const SingleCountry = ({ country }) => {
  return (
    <div>
          <h1>{country.name.common}</h1>
          <p style={{marginBottom: 0, fontWeight: 'bold' }}>capital {country.capital[0]}</p>
          <p style={{marginTop: 0, fontWeight: 'bold' }}>area {country.area}</p>
          <p style={{fontWeight: 'bold'}}>languages:</p>
          <ul>
              {Object.keys(country.languages).map((languageKey, index) => (
                <li key={index} style={{ fontWeight: 'bold' }}>
                  {country.languages[languageKey]}
                </li>
              ))}
          </ul>
          <img src={country.flags.png} alt="flag of country" />
    </div>
  )
}

export default SingleCountry