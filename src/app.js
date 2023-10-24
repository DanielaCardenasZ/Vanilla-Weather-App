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

let hour = document.querySelector(".hour");
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
  console.log(response.data.main.temp);
  let degrees = document.querySelector(`h3`);
  let cityElement = document.querySelector(`h1`);
  let temperature = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].main.toLowerCase();
  let conditionWord = document.querySelector(`h4`);
  let body = document.body;
  degrees.innerHTML = `${temperature}ºC`;
  cityElement.innerHTML = `${response.data.name}`;
  conditionWord.innerHTML = `${response.data.weather[0].main}`;

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
