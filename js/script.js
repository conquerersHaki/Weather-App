// api key variable

var myAPI = "5d93225b7abe329c1bfd28a586b8a999";
// var city; This wasnt needed. Your API will pull this.

// Function to fetch weather data

function fetchWeather(city) { //Changed this up to make it look a little closer to mine.
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myAPI}&units=imperial`; // Changed to imperial
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateWeather(data);
      document.getElementById("weatherContainer").style.display = "block";
    })
    .catch((error) => console.log("Error:", error));
}

// Function to update container boxes with weather data

function updateWeather(data) {
  var forecastData = data.list
    .filter((day) => {
      var date = new Date(day.dt * 1000);
      var hours = date.getHours();
      return hours === 16 && !isWeekdayRepeated(date);
    })
    .slice(0, 5);

  var boxes = document.querySelectorAll(".box");
//changed this up to add more "VAR" to clean it up a bit.
  forecastData.forEach((day, index) => {
    var box = boxes[index];
    var currentDate = new Date();
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + index);
    var dayOfWeek = nextDate.toLocaleDateString("en-US", { weekday: "long" });
    var tempFahrenheit = day.main.temp.toFixed(1);  // Directly in Fahrenheit
    var weatherIcon = day.weather[0].icon;
    var windSpeed = day.wind.speed;
    var humidity = day.main.humidity;

    box.innerHTML = `
      <h3>${index === 0 ? "Today" : dayOfWeek}</h3>
      <p>${tempFahrenheit}°F</p>
      <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
      <p>Wind Speed: ${windSpeed} mph</p>
      <p>Humidity: ${humidity}%</p>
    `;
  });
}


// weekday is repeating, so trying a function that cancels out any repeats--it didnt

function isWeekdayRepeated(date) {
  var currentDay = date.getDay();
  var previousDate = new Date(date);
  previousDate.setDate(date.getDate() - 1);

  return currentDay === previousDate.getDay();
}

// Event listener for button click
document.querySelector(".button").addEventListener("click", function () {
  var city = document.getElementById("citySearch").value;
  fetchWeather(city);
  // Show the container
  document.getElementById("weatherContainer").style.display = "block";
});


// This isnt needed so delete once you see

// function convertCelsiusToFahrenheit(celsius) {
//   return Math.round((celsius * 9) / 5 + 32);
// }

function isWeekdayRepeated(date) { //looks good
  var currentDay = date.getDay();
  var previousDate = new Date(date);
  previousDate.setDate(date.getDate() - 1);
  return currentDay === previousDate.getDay();
}

// Function to fetch current weather, add this for your "NEW" top 'bottom-box'
function fetchCurrentWeather(city) { 
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}&units=imperial`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateCurrentWeather(data);
    })
    .catch((error) => console.log("Error:", error));
}

// Function to update the bottom box with current weather
function updateCurrentWeather(data) {
  var bottomBox = document.querySelector(".bottom-box");
  var tempFahrenheit = data.main.temp.toFixed(1);
  var weatherIcon = data.weather[0].icon;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  
  bottomBox.innerHTML = `
    <h3>Current Weather</h3>
    <p>${tempFahrenheit}°F</p>
    <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
    <p>Wind Speed: ${windSpeed} mph</p>
    <p>Humidity: ${humidity}%</p>
  `;
}


// Modified Event listener for button click
document.querySelector(".button").addEventListener("click", function () {
  var city = document.getElementById("citySearch").value;
  fetchWeather(city);
  fetchCurrentWeather(city);  // Fetch current weather
  // Show the container
  document.getElementById("weatherContainer").style.display = "block";
});



// making container not visible until city is searched

document.querySelector(".button").addEventListener("click", function () {
  var city = document.getElementById("citySearch").value;
  fetchWeather(city);

  // Show the container
  document.getElementById("weatherContainer").style.display = "block";
});
