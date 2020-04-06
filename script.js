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
var lat;
var long;






// * Create a function for ajax method and pulling data using open weather API
//      - save needed data to variables: api Key, queryURL, date, icon, temp, humidity, windspeed, UV index
//      - renders data pulled to the DOM
//      - Needed data:
//          + Current conditions: city, date, icon, temperature, humidity, windspeed, UV index (color coded)
//          + 5 day forcast: date, icon, temperature, humidity


function getWeatherData(searchCity) {
    
    var cordsURL = "https://api.opencagedata.com/geocode/v1/json?q=" + searchCity + "&key=bc3ff0db1a6d4ff49ac9914be9c0da3b&limit=1";

    // get latitude and longitude coordinates using city name via opencage API
    $.ajax({
        url: cordsURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        lat = response.results[0].geometry.lat;
        long = response.results[0].geometry.lng;
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=5e347807f48ed981edea55456e7fea41"

        // use lat and long points to get data from openweather API
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // ****** Current weather ******** //
            var current = response.current;
            var currentDate = moment.unix(current.dt).format('M/D/YYYY');
            var temp = Math.round((current.temp * (9 / 5)) - 459.67);
            var windSpeedMPH = (current.wind_speed * 2.23694).toFixed(1);

            // display on DOM
            $("#current-name").text(searchCity);
            $("#current-date").text("(" + currentDate + ")");
            $("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + current.weather[0].icon + ".png")
            $("#current-temp").html(temp + "&#176;");
            $("#current-hum").text(current.humidity + "%");
            $("#current-wind").text(windSpeedMPH + " MPH");
            $("#current-uv").text(current.uvi);



            // ****** 5-Day Forecast ******** //
            var daily = response.daily
            for (var i = 1; i < 6; i++) {
                
                var dailyDate = moment.unix(daily[i].dt).format('M/D/YYYY');
                var dailyTemp = Math.round((daily[i].temp.max * (9 / 5)) - 459.67) + "&#176;";
                var dailyHum = daily[i].humidity + "%";
                var dailyIconURL = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + ".png";

                var newForecastCard = $('<div class="col"><div class= "card text-white bg-primary"><div class="card-body"><h5 class="card-title">' + dailyDate + '</h5><img class="forecast-icon" src=' + dailyIconURL + '><p class="card-text">Temp: ' + dailyTemp + '</p><p class="card-text">Humidity: '+ dailyHum + '</p></div></div></div>');

                $("#forecast-cards").append(newForecastCard);

                

            }


        })
    })
};

getWeatherData(searchCity);




// * Create event listener for when user types in a new city to search bar and clicks submit 
//      - changes searchCity variable
//      - calls ajax function to pull data from API and render to DOM
//      - adds city to search history (creates new item to click on)
//      - pushes new city to local storage (call push local storage function)
// * Create event listener for when a user clicks on a city from search history
//      - calls ajax function to pull data from API and render to DOM
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
