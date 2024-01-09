import {
  getWeatherByLatLng,
  displayWeatherInfo,
  displayError,
  clearInput,
} from "./weather.js";

let map, marker;

export default async function initMap() {
  // The location of Kraków
  const position = { lat: 50.02089385663359, lng: 19.96300247574961 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "weather-map",
  });

  marker = new AdvancedMarkerElement({ map: map, position: position });

  map.addListener("click", async ({ latLng: { lat, lng } }) => {
    const newPosition = { lat: lat(), lng: lng() };

    clearInput();
    marker.position = newPosition;

    try {
      const weatherData = await getWeatherByLatLng(newPosition);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error);
    }
  });
}

export function setPosition(position) {
  map.setCenter(position);
  marker.position = position;
}
