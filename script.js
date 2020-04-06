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


function getCords() {
    var cordsURL = "https://api.opencagedata.com/geocode/v1/json?q=" + searchCity + "&key=bc3ff0db1a6d4ff49ac9914be9c0da3b&limit=1";

    $.ajax({
        url: cordsURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        lat = response.results[0].geometry.lat;
        long = response.results[0].geometry.lng;
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=5e347807f48ed981edea55456e7fea41"


        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // current weather
            var current = response.current;
            $("#current-name").text(searchCity);
            $("#current-hum").text(current.humidity + "%");
            $("#current-uv").text(current.uvi);

            var currentDate = moment.unix(current.dt).format('M/D/YYYY');
            $("#current-date").text("(" + currentDate + ")");

            

            var tempK = current.temp;
            var tempF = Math.round((tempK * (9 / 5)) - 459.67);
            $("#current-temp").html(tempF + "&#176;");

            var windSpeedMS = current.wind_speed;
            var windSpeedMPH = (windSpeedMS * 2.23694).toFixed(1) + " MPH";
            $("#current-wind").text(windSpeedMPH);


            

        })




    })
};

getCords();

function getData() {
    var apiKey = "&appid=5e347807f48ed981edea55456e7fea41"
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + apiKey;
    var icon;
    var temp;
    var humidity;
    var windspeed;
    var UV;

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + apiKey;



    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#current-name").text(response.name);
        $("#current-date").text(currentDate);
        $("#current-hum").text(response.main.humidity + "%");
        
        

        var tempK = response.main.temp;
        var tempF = Math.round((tempK * (9 / 5)) - 459.67);
        $("#current-temp").html(tempF + "&#176;");

        var windSpeedMS = response.wind.speed;
        var windSpeedMPH = (windSpeedMS * 2.23694).toFixed(1) + " MPH";
        $("#current-wind").text(windSpeedMPH);
        

    });
};

// getData();





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
