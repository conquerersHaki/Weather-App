// api key and city variables

var myAPI = "5d93225b7abe329c1bfd28a586b8a999";
var city;

// creating function to get the weather info

function weatherForecast(city) {
  fetch(
    "api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      myAPI +
      "&cnt=5"
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(JSON.stringify(data));
      takeWeather(data);
    })
    .catch(function () {});
}

function getWeather(d) {
  let celsius = Math.round(parseFloat(d.main.temp) - 273.15);
  let farenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);
  let descrip = d.weather[0].descrip;

  document.getElementsById("#boxes").innerHTML = descrip;
  document.getElementsById("#boxes").innerHTML = farenheit + "&deg;";
  document.getElementsById("#boxes").innerHTML = d.name + " " + d.sys.country;

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelector(".button glow-button")
      .addEventListener("click", () => {
        let citySearch = document.querySelector(".text-search");
        console.log(citySearch.value);
        if (citySearch.value) {
          weatherForecast(citySearch.value);
        }
      });
  });
}
