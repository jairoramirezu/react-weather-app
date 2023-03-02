import "./src/App.css";
import Search from "./src/components/search/search";
import CurrentWeather from "./src/components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./src/components/search/api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.slice(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast/daily?lat={lat}&lon={lon}&cnt={7}&appid=${WEATHER_API_KEY}}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
