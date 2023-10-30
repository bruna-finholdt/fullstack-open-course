import { useEffect, useState } from "react";
import countriesService from './services/countries'
import CountriesList from "./components/CountriesList";
import SingleCountry from "./components/SingleCountry";

function App() {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  
   useEffect(() => {
    countriesService
        .getAll()
        .then(initialCountries => {
            setCountries(initialCountries);
        })
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  const handleInputChange = (event) => {
    setCountryFilter(event.target.value);
    setSelectedCountry(null); 
  };
  
  return (
    <div className="App">
      <form>
        <div>
          find countries <input value={countryFilter} onChange={handleInputChange}/>
        </div>
      </form>
      {selectedCountry ? (
      <SingleCountry country={selectedCountry} />
    ) : (
      //using a similar approach to the 'if(countryFilter) {render this}' 
      countryFilter && <CountriesList countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
    )}
    </div>
  );
}

export default App;