# Weather-Dashboard

## About

This application allows the user to search for a city and be presented with the current and future weather conditions. The current conditions include temperature, humidity, windspeed and UV index of that city. The UV index is color coded in order to represent if conditions are favorable, moderate, or severe. The five day forecast includes the temperature, humidity, and an icon representing the predicted conditions. When the user searches for a city, it is added to their search history and a button is created that the user may click on to revisit the conditions for that city. When the user refreshes the page their search history will persist and they will be presented with the weather for the last city they searched for. If their search history starts to get full they may click the clear history button at any time to delete all the city buttons.

The way this application works is by taking in user input (the city name) and requesting the latitude and longitude points of that city from the OpenCage Geocoder API. Those returned points are then used to request data from the Open Weather Maps API about the current and future weather conditions for that city.

This project taught me so much about working with server-side API's. I learned how to request data from third-party servers using AJAX, and how to use jQuery to work with that data that is returned in JSON format. I learned alot about the client-server request-response pattern, and about working with asynchronous function calls.


![](weather-dashboard.gif)


## Technologies Used

* Open Weather Maps API
* OpenCage Geocoder API
* JavaScript
* jQuery
* Moment.js
* Bulma
* HTML
* CSS


## How to Use

* Type in a city name into the search bar and press search button
* View current and future weather conditions for that city
* Click on a city in your search history to be presented with that city's weather data again
* To delete search history, click the clear history button at the bottom of the search bar

## Deployed Site

https://jpreston-alt.github.io/Weather-Dashboard/