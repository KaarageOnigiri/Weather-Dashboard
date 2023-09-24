var userInputEl = document.getElementById("user-input");
var submitEl = document.getElementById("submit");
var seachHistoryEl = document.getElementById("search-history");
var searchResultEl = document.getElementById("search-result");
var fiveDayForecastEl = document.getElementById("five-day-forecast");
var cityEl = document.getElementById("city");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidity = document.getElementById("humidity");

var dayAfterEl = [];
var dayAfterDateEl = [];
var dayAfterImageEl = [];
var dayAfterTempEl = [];
var dayAfterWindEl = [];
var dayAfterHumidityEl = [];

for (x = 0, y = 1; x < 5; x++, y++) {   
    dayAfterEl[x] = document.getElementById("day-after-" + y);
    dayAfterDateEl[x] = document.getElementById("day-after-" + y + "-date");
    dayAfterImageEl[x] = document.getElementById("day-after-" + y + "-image");
    dayAfterTempEl[x] = document.getElementById("day-after-" + y + "-temp");
    dayAfterWindEl[x] = document.getElementById("day-after-" + y + "-wind");
    dayAfterHumidityEl[x] = document.getElementById("day-after-" + y + "-humidity");
}

var weatherAPI = "https://api.openweathermap.org";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?"
var apiKey = "0c4a0f7b9dff27d58bfb79aaa0d50f4c";
var apiCall = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// units=metric

function init() {
    console.log();

    // test
    fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayResult();
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })
}

function findAPI() {
    console.log("findAPI()");

    var userInput = userInputEl.value;
    userInputEl.value = "";
    console.log(userInput.value);
    fetch(userInput)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayResult();
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })
}

function displayResult() {

}




init();
submitEl.addEventListener("click", findAPI);