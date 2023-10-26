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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//Challenge 2

function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input");

  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
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
  let windspeed = Math.round(response.data.wind.speed * 3.6);
  let condition = response.data.weather[0].main.toLowerCase();
  let descriptionElement = document.querySelector(`#description`);
  let body = document.body;
  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${city}`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed} Km/H`;
  getForecast(response.data.coord);

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
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
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

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
               <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max" 
                  >${Math.round(forecastDay.temp.max)}º  </span
                ><span class="weather-forecast-temperatures-min" ">  ${Math.round(
                  forecastDay.temp.min
                )}º </span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
