// Search button - Changing Cities
function search(city){
  let apiKey = "8d4d6dc5d5fb8a2637bc62c866428e4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  currentCity.innerHTML = `${city}`;
  axios.get(`${apiUrl}&units=imperial`).then(weatherDescription);
}

function searchCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#cityInput");
  search(changeCity.value);
  }

// weather information
function weatherDescription(response){
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#current-icon");
  let dataElement = document.querySelector("#dateAndTime");
  let feelsElement = document.querySelector("#feels");

  fahrenheitTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description; 
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed); 
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)  
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dataElement.innerHTML = formatDate(response.data.dt * 1000);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  getForecast(response.data.coord);
}

//Temperature Functions
function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = Math.round((fahrenheitTemperature-32)*(5/9));
  temperatureElement.innerHTML = `${celsiusTemperature}`
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


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
  axios.get(`${apiUrlCurrent}`).then(currentPosition);
  axios.get(`${apiUrlCurrent}&units=imperial`).then(weatherDescription);
}

function yourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", yourLocation);


//forecast
function getForecast(coordinates){
  let apiKeyForecast = "8d4d6dc5d5fb8a2637bc62c866428e4a"
  let apiURLForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKeyForecast}&units=imperial`;
  axios.get(apiURLForecast).then(displayForecast);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-evenly position-relative">`
    forecast.forEach(function(forecastDay, index){
      if (index < 5) {
    forecastHTML = forecastHTML + 
              `<div class="col-lg mb-4">
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">
                      <img 
                      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                      alt="${forecastDay.weather[0].description}"
                      />
                      <br /><br />
                      ${formatDay(forecastDay.dt)}
                      <br />
                      <strong>${Math.round(forecastDay.temp.max)}º</strong> / ${Math.round(forecastDay.temp.min)}º
                    </p>
                  </div>
                </div>
              </div>`
  }})

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;      
}

// Time & Date
let cityUpdate = document.querySelector("#search-city");
cityUpdate.addEventListener("click", searchCity);

//Current Time
function formatDate(timestamp){
let now = new Date(timestamp);
let date = now.getDate();
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
if (hour > 10){
hour =`${hour}`-12;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let daytime = "AM"
if (hour > 10){
  daytime = "PM";
}

let currently = `${day}, ${month} ${date} ~ ${hour}:${minutes} ${daytime}`;
console.log(currently);
return `${currently}`;

}

search("Detroit");