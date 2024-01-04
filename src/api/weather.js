const apiKey = "cf60c89815b29a12e58c6f2da5c40ec0";

export async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }
  
    return response.json();
  }