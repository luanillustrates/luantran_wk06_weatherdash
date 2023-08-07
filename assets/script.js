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

                // clear previous entries in forecast
                $("#five-day").empty();

                // get every 8th value (24hours)
                for (i = 7; i <= data.list.length; i += 8) {

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

    // save searched
    lastCitySearched = weatherData.name;

    saveSearchHistory(weatherData.name);
};

// local storage properties
let saveSearchHistory = function (city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    }

    localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
    localStorage.setItem("lastCitySearched", JSON.stringify(lastCitySearched));

    loadSearchHistory();
};

let loadSearchHistory = function () {
    searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"));

    if (!searchHistory) {
        searchHistory = []
    }

    if (!lastCitySearched) {
        lastCitySearched = ""
    }

    $("#search-history").empty();

    // run through cities found in array
    for (i = 0; i < searchHistory.length; i++) {

        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
};

loadSearchHistory();


if (lastCitySearched != "") {
    callCityWeather(lastCitySearched);
}

$("#search-form").submit(searchSubmitHandler);
$("#search-history").on("click", function (event) {
    let prevCity = $(event.target).closest("a").attr("id");
    callCityWeather(prevCity);
});
$("#clear-search").on("click", function () {
    localStorage.clear();
    searchHistory = [];
    loadSearchHistory();
});
