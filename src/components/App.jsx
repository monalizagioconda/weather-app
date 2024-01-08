import { useState } from "react";
import "./App.css";
import Card from "./Card.jsx";
import ErrorCard from "./ErrorCard.jsx";
import Form from "./Form.jsx";
import { getWeatherData } from "../api/weather.js";

function App() {
  const [weatherData, setWeatherData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleCity = async (city) => {
    const isCityEmpty = city.trim() === ''

    setErrorMessage(isCityEmpty ? 'Please enter a city' : undefined)

    try {
      const data = isCityEmpty ? undefined : await getWeatherData(city);

      setWeatherData(data);
    } catch (err) {
      setErrorMessage(err.message)
    }
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
      {errorMessage ? <ErrorCard>{errorMessage}</ErrorCard> : null}
    </>
  );
}

export default App;
