// ********* TO DO ************ //
// * Create HTML page layout
// * Style using Bootstrap and my own stylesheet
// * Create global variables
//      - elements needed from HTML
//      - search history array
//      - last searched city
//      - searchCity (current)
// * Create a function for ajax method and pulling data using open weather API
//      - save needed data to variables: api Key, queryURL, date, icon, temp, humidity, windspeed, UV index
//      - renders data pulled to the DOM
//      - Needed data:
//          + Current conditions: city, date, icon, temperature, humidity, windspeed, UV index (color coded)
//          + 5 day forcast: date, icon, temperature, humidity
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
