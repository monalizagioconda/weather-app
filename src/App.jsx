import { useState } from "react";
import "./App.css";
import Card from "./Card.jsx";
import ErrorCard from "./ErrorCard.jsx";
import Form from "./Form.jsx";
import { getWeatherData } from "./api/weather.js";

function App() {
  const [weatherData, setWeatherData] = useState();
  const [showError, setShowError] = useState(false);

  const handleCity = async (city) => {
    const isCityEmpty = city.trim() === ''

    setShowError(isCityEmpty)

    const data = isCityEmpty ? undefined : await getWeatherData(city);

    setWeatherData(data);
  };

  return (
    <>
      <Form onCity={handleCity} />
      {weatherData ? (
        <Card
          city={weatherData.name}
          temp={weatherData.main.temp}
          humidity={weatherData.main.humidity}
          pressure={weatherData.main.pressure}
          description={weatherData.weather[0].description}
          weatherId={weatherData.weather[0].id}
        />
      ) : null}
      {showError ? <ErrorCard /> : null}
    </>
  );
}

export default App;
