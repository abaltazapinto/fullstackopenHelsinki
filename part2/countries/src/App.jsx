import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const apikey = "7fedafb2d6254d65926150312242005";

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data); //initialize filteredCountries with all countries
      })
      .catch((error) => {
        console.log.error("Error fetching data from the API", error);
      });
  }, []);

  useEffect(() => {
    if (showCountry) {
      fetchWeather(showCountry.capital[0]);
    }
  }, [showCountry]);

  const fetchWeather = (capital) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${capital}`;
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data from the API", error);
      });
  };

  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCountries(filteredCountries);
  }, [searchTerm, countries]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowDetails = (country) => {
    setShowCountry(country);
  };

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>show</button>
              {showCountry && showCountry.cca3 === country.cca3 && (
                <div>
                  <h3>languages: </h3>
                  <ul>
                    {country.languages &&
                      Object.values(country.languages).map(
                        (languages, index) => <li key={index}>{languages}</li>,
                      )}
                  </ul>
                  <p>Flag</p>
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width="100"
                    height="50"
                  />
                  {weather && weather.current && (
                    <div>
                      <h3>Weather in {showCountry.capital[0]}</h3>
                      <p>Temperature: {weather.current.temp_f}°F</p>
                      <p>Temperature: {weather.current.temp_c} °C</p>
                      <p>Weather: {weather.current.condition.text} </p>
                      <p>
                        Wind: {weather.current.wind_kph} kph direction{" "}
                        {weather.current.wind_dir}
                      </p>
                      <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
