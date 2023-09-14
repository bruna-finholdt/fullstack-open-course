import { useEffect, useState } from "react";
import countriesService from './services/countries'
import CountriesList from "./components/CountriesList";

function App() {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("");
  
  
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
  };
  
  return (
    <div className="App">
      <form>
        <div>
          find countries <input value={countryFilter} onChange={handleInputChange}/>
        </div>
        {/* using a similar approach to the 'if(countryFilter) {render this}' */}
        {countryFilter && <CountriesList countries={filteredCountries} />} 
      </form>
    </div>
  );
}

export default App;