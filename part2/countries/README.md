# React + Vite

It seems like the temperature might not be displaying correctly due to an issue with accessing the correct property in the API response. Let's ensure that the response structure is correctly handled.

### Updated Code with Detailed Comments

```javascript
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const apikey = "YOUR_WEATHERAPI_KEY"; // Replace with your WeatherAPI key

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API", error);
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
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCountries(results);
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
              <button onClick={() => handleShowDetails(country)}>Show</button>
              {showCountry && showCountry.cca3 === country.cca3 && (
                <div>
                  <h3>Languages spoken:</h3>
                  <ul>
                    {Object.values(country.languages).map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                  <p>Flag:</p>
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    width="100"
                    height="50"
                  />
                  {weather && weather.current && (
                    <div>
                      <h3>Weather in {showCountry.capital[0]}</h3>
                      <p>Temperature: {weather.current.temp_c}°C</p>
                      <p>Weather: {weather.current.condition.text}</p>
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
```

### Key Points:

1. **API Key**: Ensure your actual WeatherAPI key is used.
2. **Weather Data Structure**: Verify that `weather.current` and its properties such as `temp_c`, `condition.text`, `wind_kph`, and `wind_dir` are correctly accessed.
3. **Ensure Data Availability**: Added `weather && weather.current` to check the availability of data before accessing properties.

This should display the temperature correctly along with the other weather details. If the temperature is still not displaying, please verify the structure of the API response using a console log:

```javascript
console.log(response.data);
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

to know more . https://chatgpt.com/share/6fdfc96f-8bbf-40e1-8027-0da95d2d1e6b

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
