// variables for weather call
let searchWeather = document.getElementById('weather-search');
let city = document.getElementById('weather-city');
let day = document.getElementById('weather-day');
let currentTemp = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let image = document.getElementById('weather-image');
let currentDate = document.getElementById('date');

let forecastBlock = document.querySelector('weather-forecast');

// localstorage variables
let clearSearch = document.getElementById('clear-history');

let searchHistory = [];

// API call variables
const apiKey = '80d392c0fc6edd69ae0c76f5dce0f6d0';
const queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + apiKey;

// get city details
let weatherCity = async (city) => {
    let cityCall = queryUrl + '&q=' + city;
    let response = await fetch(cityCall);
    if (response.status !== 200) {
        alert('city not found');
    }
    let weather = await response.json();
    return weather;
}

let forecastCity = async (cityId) => {
    let forecastCall = queryUrl + '&id=' + cityId;
    let result = await fetch(forecastCall);
    let forecast = await result.json();
    console.log(forecast);
    let forecastList = forecast.list;
    let daily = [];

    forecastList.forEach(day => {
        let date = new Date(day.dt_txt.replace(' ', 'T'));
        let hours = date.getHours();
        if(hours === 12) {
            daily.push(day);
        }
    })
    return daily;
    
}


// initiates search
searchWeather.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        let weather = await weatherCity(searchWeather.value);
        let cityID = weather.id;
        updateWeather(weather);
        let forecast = await forecastCity(cityID);
        updateForecast(forecast);
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

let updateForecast = (forecast) => {
    forecastBlock.innerHTML = '';
    forecast.forEach(day => {
        let iconUrl = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
        let dayName = dayWeek(day.dt * 1000);
        let temperature = day.list.main.temp;
        let forecastItem = `
            <article class="forecast-item card m-5">
            <img src="${iconUrl}" alt="${day.weather[0].description}" class="forecast-image">
            <h3 class="forecast-day">${dayName}</h3>
            <p id="forecast-date"></p>
            <p class="forecast-temp">${temperature}</p>
            <p class="forecast-humidity">${humidity}</p>
            <p class="forecast-wind">${wind}</p>
            </article> 
        `;
        forecastBlock.insertAdjacentHTML('beforeend', forecastItem)
    })
}

let dayWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString('en-EN', { 'weekday': 'short' });
}

// // save the last city searched
// lastCitySearched = weatherData.name;

// // save to the search history using the api's name value for consistancy
// // this also keeps searches that did not return a result from populating the array
// saveSearchHistory(weatherData.name);

