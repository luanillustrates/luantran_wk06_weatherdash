var city = document.getElementById("search-city");
var searchCity = document.getElementById("search-button");
var clearSearch = document.getElementById("clear-history");
var historyEl = document.getElementById("history");
var currentWeather = document.getElementById("current-weather");
var cityName = document.getElementById("city-name");
var currentImage = document.getElementById("current-img");
var currentTemp = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentUV = document.getElementById("UV");
var currentWind = document.getElementById("wind");
var fiveDay = document.getElementById("fiveday");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const apiKey = "";

function getWeather(cityName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    $.get(queryURL)
        .then(function (response) {
            currentWeather.classList.remove("d-none");
        }
        
        )
}



fetch(queryURL)

clearEl.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})