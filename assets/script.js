let searchHistory = [];
let lastCitySearched = "";

// api call 
let getCityWeather = function (city) {
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

// function to handle city search form submit
let searchSubmitHandler = function (event) {
    event.preventDefault();
    let cityName = $("#cityname").val().trim();
    if (cityName) {
        // pass the value to getCityWeather function
        getCityWeather(cityName);

        // clear search input
        $("#cityname").val("");
    } else {
        // if nothing was entered alert the user
        alert("Please enter a city name");
    }
};