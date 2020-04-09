// ********* TO DO ************ //
// * Create HTML page layout
// * Style using Bootstrap and my own stylesheet


// * Create global variables
//      - elements needed from HTML
//      - search history array
//      - last searched city
//      - searchCity (current)

var searchArr = [];
var lastCity;
var searchCity = "Seattle";

// Defines a function for getting weather data
function getWeatherData(searchCity) {
    
    // get latitude and longitude coordinates using city name via opencage API
    var cordsURL = "https://api.opencagedata.com/geocode/v1/json?q=" + searchCity + "&key=bc3ff0db1a6d4ff49ac9914be9c0da3b&limit=1";

    $.ajax({
        url: cordsURL,
        method: "GET"
    }).then(function (response) {

        // store lat and long in variables
        var lat = response.results[0].geometry.lat;
        var long = response.results[0].geometry.lng;

        // use lat and long points to get data from openweather API
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=5e347807f48ed981edea55456e7fea41"

        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {

            // ****** CURRENT WEATHER ******** //
            var current = response.current;

            // save current weather data to variables
            var currentDate = moment.unix(current.dt).format('M/D/YYYY');
            var currentTemp = Math.round((current.temp * (9 / 5)) - 459.67) + "&#176;";
            var windSpeed = (current.wind_speed * 2.23694).toFixed(1) + " MPH";
            var currentIconURL = "http://openweathermap.org/img/wn/" + current.weather[0].icon + ".png";
            var currentHum = current.humidity + "%";
            var currentUV = current.uvi;

            // adds data to DOM
            $("#current-header").text(searchCity + " (" + currentDate + ")");
            $("#current-temp").html(currentTemp);
            $("#current-hum").text(currentHum);
            $("#current-wind").text(windSpeed);
            $("#current-icon").attr("src", currentIconURL);
            $("#current-uv").text(currentUV);

            // colorize UV index element depeding on value
            var UVindex = currentUV;
            var uvEl = $("#current-uv");
            
            if (UVindex <= 2) {
                uvEl.removeClass("moderate high severe");
                uvEl.addClass("low");
            } else if (UVindex > 2 && UVindex <= 5) {
                uvEl.removeClass("low high severe");
                uvEl.addClass("moderate");
            } else if (UVindex > 5 && UVindex <= 7) {
                uvEl.removeClass("moderate low severe");
                uvEl.addClass("high");
            } else {
                uvEl.removeClass("moderate high low");
                uvEl.addClass("severe");
            };


            // ****** 5-DAY FORECAST ******** //
            var daily = response.daily
            
            // loops through 5 days of daily forcast data
            for (var i = 1; i < 6; i++) {
                // for each of the five days:

                // saves data to variables
                var dailyDate = moment.unix(daily[i].dt).format('M/D/YYYY');
                var dailyTemp = Math.round((daily[i].temp.max * (9 / 5)) - 459.67) + "&#176;";
                var dailyHum = daily[i].humidity + "%";
                var dailyIconURL = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + ".png";

                // adds to the DOM
                $(".daily-date").eq(i - 1).text(dailyDate);
                $(".daily-temp").eq(i - 1).html(dailyTemp);
                $(".daily-hum").eq(i - 1).text(dailyHum);
                $(".daily-icon").eq(i - 1).attr("src", dailyIconURL);

            }
        })
    })
};


// * Create event listener for when user types in a new city to search bar and clicks submit 
//      - changes searchCity variable
//      - calls ajax function to pull data from API and render to DOM
//      - adds city to search history (creates new item to click on)
//      - pushes new city to local storage (call push local storage function)

$(document).ready(function () {

    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        var searchInput = $("#search-input").val().trim();
        if (searchInput !== "") {
            searchCity = searchInput;
            getWeatherData(searchCity);
            searchArr.push(searchCity);
            renderCityBtns();
            lastCity = searchCity;
            setStorage();
        };
    });

    // * Create event listener for when a user clicks on a city from search history
    //      - calls ajax function to pull data from API and render to DOM
    $(document).on("click", ".city-btn", function(event) {
        event.preventDefault();
        searchCity = $(this).text();
        getWeatherData(searchCity);
    });

    // Create event listener for clear button
    $(document).on("click", "#clear-btn", function (event) {
        event.preventDefault();
        searchArr = [];
        renderCityBtns();
        setStorage();
    });

});

// create funciton to generate city buttons
function renderCityBtns() {
    $("#city-list").empty();
    for (var i = 0; i < searchArr.length; i++) {
        var cityBtn = $("<a class='city-btn list-item'>" + searchArr[i] + "</a>")
        $("#city-list").append(cityBtn);
    }
};

// * Create a funciton to store search history in local storage
function setStorage() {
    JSONsearchArr = JSON.stringify(searchArr);
    localStorage.setItem("search-history", JSONsearchArr);
};

// * Create a function to pulls search history from local storage
function pullStorage() {
    var searchHistory = JSON.parse(localStorage.getItem("search-history"));

    // only save to array and render if there is history stored in local storage
    if (searchHistory !== null) {
        searchArr = searchHistory;
        lastCity = searchArr[searchArr.length - 1];
        renderCityBtns();
    };
};

// * Create an init function
//      - calls function to pull from local storage
//      - calls function to render from local storage
//      - sets searchedCity to last searched city from local storage
function init() {
    pullStorage();
    if (lastCity) {
        searchCity = lastCity;
    }
    getWeatherData(searchCity);
};

// * Call init function
init();
