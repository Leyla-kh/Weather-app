let now = new Date();
let currentTime = document.querySelector("#current-hour");
let CurrentHour = now.getHours();
if (CurrentHour < 10) CurrentHour = `0${CurrentHour}`;
let CurrentMinute = now.getMinutes();
if (CurrentMinute < 10) CurrentMinute = `0${CurrentMinute}`;
currentTime.innerHTML = `${CurrentHour} : ${CurrentMinute}`;
let days = [
  "Sunday",
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = days[now.getDay()];

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text");

  let apiKey = `d61e33eb8b7d77b8e9f463b4ce970f4d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(Temperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

function Temperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = cityTemp;
  let currentCityName = document.querySelector(".mainCity");
  currentCityName.innerHTML = response.data.name;
  function fahrenheit() {
    currentTemp.innerHTML = Math.round(cityTemp * 1.8 + 32);
  }
  function celsius() {
    currentTemp.innerHTML = cityTemp;
  }
  let fahrenheitBtn = document.querySelector("#fahrenheit-temp");
  fahrenheitBtn.addEventListener("click", fahrenheit);
  let celsiusBtn = document.querySelector("#celsius-temp");
  celsiusBtn.addEventListener("click", celsius);
}

function currentPositon(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPositonTemp);
  function currentPositonTemp(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = `d61e33eb8b7d77b8e9f463b4ce970f4d`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(Temperature);
  }
}
let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentPositon);
