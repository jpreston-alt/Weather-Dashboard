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
var searchCity = "Tampa";



// Defines a function for getting weather data
function getWeatherData(searchCity) {
    $("#forecast-cards").empty();
    $("#forecast-header").empty();
    $("#current-card").empty();
    
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
            console.log(response);

            // ****** CURRENT WEATHER ******** //
            var current = response.current;

            // save current weather data to variables
            var currentDate = moment.unix(current.dt).format('M/D/YYYY');
            var currentTemp = Math.round((current.temp * (9 / 5)) - 459.67) + "&#176;";
            var windSpeedMPH = (current.wind_speed * 2.23694).toFixed(1);
            var currentIconURL = "http://openweathermap.org/img/wn/" + current.weather[0].icon + ".png";
            var currentUV = current.uvi;
            var currentHum = current.humidity + "%";

            // generate current card based on current weather variables
            var currentCard = $('<div class="col"><div class="card"><div class="card-body"><h2>' + searchCity + " (" + currentDate + ")" + '<img id="current-icon" src=' + currentIconURL +'></h2><div id="current-info"><p>Temperature: ' + currentTemp + '</p><p>Humidity: ' + currentHum + '</p><p>Windspeed: ' + windSpeedMPH + '</p><p>UV Index: ' + currentUV + '</p></div></div></div></div >')

            // append current card to document
            $("#current-card").append(currentCard);



            // ****** 5-DAY FORECAST ******** //
            var daily = response.daily

            // generate and append forecast header to the DOM
            var forecastHeader = $('<h4>5-Day Forecast:</h4>');
            $("#forecast-header").append(forecastHeader);


            // loops through 5 days of daily forcast data
            for (var i = 1; i < 6; i++) {
                
                // saves data to variables
                var dailyDate = moment.unix(daily[i].dt).format('M/D/YYYY');
                var dailyTemp = Math.round((daily[i].temp.max * (9 / 5)) - 459.67) + "&#176;";
                var dailyHum = daily[i].humidity + "%";
                var dailyIconURL = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + ".png";

                // generate new daily forecast card using variables
                var dailyCard = $('<div class="col forecast-card"><div class= "card text-white bg-primary"><div class="card-body"><h5 class="card-title">' + dailyDate + '</h5><img class="forecast-icon" src=' + dailyIconURL + '><p class="card-text">Temp: ' + dailyTemp + '</p><p class="card-text">Humidity: '+ dailyHum + '</p></div></div></div>');


                // append new daily card to forecast cards div
                $("#forecast-cards").append(dailyCard);
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
        // event.preventDefault();
        searchCity = $("#search-input").val();

        getWeatherData(searchCity);
        genCityButton();
    });

    // * Create event listener for when a user clicks on a city from search history
    //      - calls ajax function to pull data from API and render to DOM
    $(document).on("click", ".city-btn", function(event) {
        // event.preventDefault();
        searchCity = $(this).text();
        getWeatherData(searchCity);
    });

});

// create funciton to generate city button when user searches for a city
function genCityButton() {
    var cityBtn = $('<button type="button" class="list-group-item list-group-item-action city-btn"></button>')
    cityBtn.text(searchCity);
    $("#city-list").append(cityBtn);
}


// * Create a funciton to store data in local storage
//      - store search history
//      - store last searched city
// * Create a function to pull from local storage
//      - pulls search history
//      - pulls last searched city
// * Create a function that renders items from local storage to DOM
//      - search history items
//      - last searched city is displayed on DOM
// * Create an init function
//      - calls function to pull from local storage
//      - calls function to render from local storage
//      - sets searchedCity to last searched city from local storage
// * Call init function
