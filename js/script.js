// api key
const API_KEY = "6f15d5bec9c13bccf34fc8310baf5a34";

function getWeather() {
  const location = document.getElementById("location").value;

  // locally storing information
  localStorage.setItem("location", location);

  // the five day forecast
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const forecastList = data.list;

      let groups = {};
      for (const item of forecastList) {
        const date = item.dt_txt.split(" ")[0];
        if (!groups[date]) groups[date] = [];
        groups[date].push(item);
      }

      let dayIndex = 1;
      for (const date in groups) {
        const [year, month, day] = date.split("-");
        const formattedDate = `${month}/${day}`;
        let temps = groups[date].map((item) => item.main.temp);
        let high = Math.max(...temps).toFixed(1);
        let low = Math.min(...temps).toFixed(1);
        const weatherIcon = groups[date][0].weather[0].icon;

        document.getElementById(`day${dayIndex}`).innerHTML = `
    <h3>${formattedDate}</h3>
    <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
    <p>High: ${high}°F</p>
    <p>Low: ${low}°F</p>
    <p>Humidity: ${groups[date][0].main.humidity}%</p>
    <p>Wind Speed: ${groups[date][0].wind.speed} mph</p>
    `;

        if (dayIndex >= 5) break;
        dayIndex++;
      }
    })
    .catch((error) => console.error("Couldn't fetch 5-day forecast:", error));

  // getting real time weather
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherIcon = data.weather[0].icon;

      document.getElementById(`hour1`).innerHTML = `
        <h3>Current Day</h3>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
      `;
    })
    .catch((error) => console.error("Couldn't fetch current weather:", error));
}

// referencing local storage
if (localStorage.getItem("location")) {
  document.getElementById("location").value = localStorage.getItem("location");
  getWeather();
}
