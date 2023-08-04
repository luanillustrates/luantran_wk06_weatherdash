let searchWeather = document.getElementById('weather-search');
let city = document.getElementById('weather-city');
let day = document.getElementById('weather-day');
let currentTemp = document.getElementById('temperature>.value');
let humidity = document.getElementById('humidity>.value');
let wind = document.getElementById('wind>.value');
let image = document.getElementById('weather-image');

let clearSearch = document.getElementById('clear-history');
let historyEl = document.getElementById('history');

let searchHistory = JSON.parse(localStorage.getItem('search')) || [];
const apiKey = '8bd71eee6c506631558c763d01721081';
let queryUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

let weatherCity = async (city) => {
    let parameter = queryUrl + '&q=' + city;
    let response = await fetch(parameter);
    let weather = await response.json();
    return weather;
}

searchWeather.addEventListener('keydown', async (e) => {
    if(e.key === 'Enter') {
        let weather = await weatherCity(searchWeather.value);
        updateWeather(weather);
    }
})

let updateWeather = (data) => {
    city.textContent = data.name + ', ' + data.sys.country;

    temperature.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed
}

