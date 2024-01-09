import { setPosition } from './maps.js'

const apiKey = "cf60c89815b29a12e58c6f2da5c40ec0";

const weather = document.querySelector(".weather");
const form = weather.querySelector("form");
const cityInput = form.querySelector("input");
const card = weather.querySelector(".card");

export default function initWeather() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
      try {
        const weatherData = await getWeatherByCity(city);
        displayWeatherInfo(weatherData);
        setPosition({ lat: weatherData.coord.lat, lng: weatherData.coord.lon });
      }
      catch (error) {
        displayError(error);
      }
    } else {
      displayError("Please enter a city");
    }
  });
}

async function getWeatherByCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

export async function getWeatherByLatLng({ lat, lng }) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

export function displayWeatherInfo(data) {
  const {
    name: city,  // const city = data.name
    main: { temp, humidity, pressure },
    weather: [{ description, id }],
  } = data; // destructuting obiektów i tablicy

  card.textContent = '';
  card.style.removeProperty('display');

  const cityDisplay = document.createElement('h1');
  const tempDisplay = document.createElement('p');
  const humidityDisplay = document.createElement('p');
  const pressureDisplay = document.createElement('p');
  const descDisplay = document.createElement('p');
  const weatherEmoji = document.createElement('p');

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  pressureDisplay.textContent = `Pressure: ${pressure} hPa`;
  descDisplay.textContent = description.replace(/^\w/, i => i.toUpperCase());
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add('city');
  tempDisplay.classList.add('temperature');
  humidityDisplay.classList.add('p');
  pressureDisplay.classList.add('p');
  descDisplay.classList.add('p');
  weatherEmoji.classList.add('emoji');

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(pressureDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return '⛈️';
        case (weatherId >= 300 && weatherId < 400):
            return '🌧️';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️';
        case (weatherId >= 600 && weatherId < 700):
            return '❄️';
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️';
        case (weatherId === 800):
            return '☀️';
        case (weatherId >= 801 && weatherId < 810):
            return '☁️';
        default:
            return '❓';
    }
}

export function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

export function clearInput() {
  cityInput.value = '';
}
