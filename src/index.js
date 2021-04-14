// Search button - Changing Cities
function searchCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#cityInput");
  let apiKey = "8d4d6dc5d5fb8a2637bc62c866428e4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity.value}&appid=${apiKey}`;
  currentCity.innerHTML = `${changeCity.value}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(weatherDescription);
  axios.get(`${apiUrl}&units=imperial`).then(showTemperatureF);
  axios.get(`${apiUrl}&units=metric`).then(showTemperatureC);
}

// weather information
function weatherDescription(response){
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description; 
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed); 
  }


function showTemperatureF(response) {
  let temperatureF = Math.round(response.data.main.temp);
  tempF.innerHTML = `${temperatureF}`;
}
function showTemperatureC(response) {
  let temperatureC = Math.round(response.data.main.temp);
  tempC.innerHTML = `${temperatureC}`;
}

// Current Location
function currentPosition(response) {
  let city = response.data.name;
  currentCity.innerHTML = `${city}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKeyCurrent = "8d4d6dc5d5fb8a2637bc62c866428e4a";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyCurrent}`;
  axios.get(`${apiUrlCurrent}&units=imperial`).then(showTemperatureF);
  axios.get(`${apiUrlCurrent}&units=metric`).then(showTemperatureC);
  axios.get(`${apiUrlCurrent}`).then(currentPosition);
}

function yourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", yourLocation);

// Time & Date
let cityUpdate = document.querySelector("#search-city");
cityUpdate.addEventListener("click", searchCity);

//Current Time
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
let currently = `${day}, ${month} ${date}, ${year} (${hour}:${minute})`;
console.log(currently);
let newCurrently = document.querySelector("#dateAndTime");
newCurrently.innerHTML = `${currently}`;
