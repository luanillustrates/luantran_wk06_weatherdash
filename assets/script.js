// variables for weather call
let searchWeather = document.getElementById('weather-search');
let city = document.getElementById('weather-city');
let day = document.getElementById('weather-day');
let currentTemp = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let image = document.getElementById('weather-image');
let currentDate = document.getElementById('date');

// localstorage variables
let clearSearch = document.getElementById('clear-history');

let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

// API call variables
const apiKey = '80d392c0fc6edd69ae0c76f5dce0f6d0';
let queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + apiKey;

// get city details
let weatherCity = async (city) => {
    let cityParameter = queryUrl + '&q=' + city;
    let response = await fetch(cityParameter);
    let weather = await response.json();
    return weather;
}

// initiates search
searchWeather.addEventListener('keydown', async (e) => {
    if(e.key === 'Enter') {
        let weather = await weatherCity(searchWeather.value);
        updateWeather(weather);
    }
})

// obtain weather data
let updateWeather = (data) => {
    currentDate.textContent = dayjs().format('DD / MM / YY');
    city.textContent = data.city.name + ', ' + data.city.country;
    temperature.textContent = Math.round(data.list[0].main.temp) + ' °C';
    humidity.textContent = Math.round(data.list[0].main.humidity) + ' %';
    wind.textContent = data.list[0].wind.speed + ' m/s';
}

let forecastBlock = document.querySelector('.weather-forecast');

fetch(queryUrl)
    .then 

