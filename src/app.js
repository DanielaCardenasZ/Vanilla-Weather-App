let currentdate = document.querySelector("#exact-date");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
  "December",
];
let month = months[now.getMonth()];
currentdate.innerHTML = `${date} ${month} ${year}`;

let weekday = document.querySelector("#weekday");
weekday.innerHTML = `${day}`;

let hour = document.querySelector("#hour");
hour.innerHTML = `${hours}:${mins}`;

//Challenge 2

function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input");

  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector(".searchbr");
form.addEventListener("submit", search);

//Hwrk week 5
function showTemperature(response) {
  let tempElement = document.querySelector(`#temperature`);
  let cityElement = document.querySelector(`h1`);
  let city = response.data.name;
  let humidityElement = document.querySelector(`#humidity`);
  let windspeedElement = document.querySelector(`#windspeed`);
  let humidity = Math.round(response.data.main.humidity);
  let windspeed = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].main.toLowerCase();
  let descriptionElement = document.querySelector(`#description`);
  let body = document.body;
  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${city}`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed} Km/H`;

  if (condition === "clear") {
    body.classList.add("clear");
    document.querySelector("h5 ").innerHTML = '<i class="bx bx-sun"></i>';
  } else if (condition === "clouds") {
    body.classList.add("clouds");
    document.querySelector("h5").innerHTML = '<i class="bx bx-cloud"></i>';
  } else if (condition === "rain" || condition === "drizzle") {
    body.classList.add("rain");
    document.querySelector("h5").innerHTML = '<i class="bx bx-cloud-rain"></i>';
  } else if (condition === "snow") {
    body.classList.add("snow");
    document.querySelector("h5").innerHTML = '<i class="bx bx-cloud-snow"></i>';
  } else {
    body.classList.add("other");
    document.querySelector("h5").innerHTML = '<i class="bx bx-sun"></i>';
  }
  getForecast(response.data.coord);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", showCelsiusTemp);
displayForecast();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = [`Mon`, `Tues`, `Thur`];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <i class="bx bx-cloud-light-rain" ></i>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max" 
                  >18º </span
                ><span class="weather-forecast-temperatures-min" "> 12º</span>
              </div>
            </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
