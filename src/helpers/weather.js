export function getWeatherEmoji(weatherId) {
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