import './Card.css'
import { getWeatherEmoji } from '../helpers/weather.js'

const Card = ({ city, temp, humidity, pressure, description, weatherId }) => {
  return (
    <div className="card">
      <h1 className="city">{city}</h1>
      <p className="temp">{(temp - 273.15).toFixed(1)}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Pressure: {pressure} hPa</p>
      <p>{description}</p>
      <p className="weatherEmoji">{getWeatherEmoji(weatherId)}</p>
    </div>
  );
};

export default Card;
