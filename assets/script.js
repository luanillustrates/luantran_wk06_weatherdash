let searchHistory = [];
let lastCitySearched = "";

// api call 
let callCityWeather = function (city) {
    let apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=80d392c0fc6edd69ae0c76f5dce0f6d0&units=metric";

    fetch(apiCall)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })

        .catch(function (error) {
            alert("error");
        })
};

// submit form function
let searchSubmitHandler = function (event) {
    event.preventDefault();
    let cityName = $("#cityname").val().trim();
    if (cityName) {
        callCityWeather(cityName);

        // clear search input
        $("#cityname").val("");
    } else {
        alert("enter a city name");
    }
};

// collected data function
let displayWeather = function (weatherData) {

    // format data values
    $("#city").text(weatherData.name + ' _ ' + dayjs(weatherData.dt * 1000).format("ddd DD.MM.YY")).append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#temp").text("Temperature : " + Math.round(weatherData.main.temp.toFixed(1)) + ' °C');
    $("#humidity").text("Humidity : " + weatherData.main.humidity + ' %');
    $("#wind").text("Wind speed : " + weatherData.wind.speed.toFixed(1) + ' m/s');

    // five-day api call
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherData.name + "&appid=80d392c0fc6edd69ae0c76f5dce0f6d0&units=metric")
        .then(function (response) {
            response.json().then(function (data) {

                // clear any previous entries in the five-day forecast
                $("#five-day").empty();

                // get every 8th value (24hours) in the returned array from the api call
                for (i = 7; i <= data.list.length; i += 8) {

                    // insert data into my day forecast card template
                    let fiveDayCard = `
                    <div class="col-md-2 m-2 py-2 card text-dark bg-warning">
                        <div class="card-body p-1">
                            <h5 class="card-title">` + dayjs(data.list[i].dt * 1000).format("ddd DD.MM.YY") + `</h5>
                            <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="">
                            <p class="card-text">Temperature : ` + Math.round(data.list[i].main.temp) + ` °C</p>
                            <p class="card-text">Humidity : ` + data.list[i].main.humidity + ` %</p>
                            <p class="card-text">Wind speed : ` + data.list[i].wind.speed + ` m/s</p>
                        </div>
                    </div>
                    `;

                    $("#five-day").append(fiveDayCard);
                }
            })
        });
