var userInputEl = document.getElementById("user-input");
var submitEl = document.getElementById("submit");
var seachHistoryEl = document.getElementById("search-history");
var searchResultEl = document.getElementById("search-result");
var fiveDayForecastEl = document.getElementById("five-day-forecast");
var cityEl = document.getElementById("city");
var dateEl = document.getElementById("date");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");

var dayAfterEl = [];
var dayAfterDateEl = [];
var dayAfterIconEl = [];
var dayAfterTempEl = [];
var dayAfterWindEl = [];
var dayAfterHumidityEl = [];

for (x = 0, y = 1; x < 5; x++, y++) {   
    dayAfterEl[x] = document.getElementById("day-after-" + y);
    dayAfterDateEl[x] = document.getElementById("day-after-" + y + "-date");
    dayAfterIconEl[x] = document.getElementById("day-after-" + y + "-icon");
    dayAfterTempEl[x] = document.getElementById("day-after-" + y + "-temp");
    dayAfterWindEl[x] = document.getElementById("day-after-" + y + "-wind");
    dayAfterHumidityEl[x] = document.getElementById("day-after-" + y + "-humidity");
}

var weatherAPI = "https://api.openweathermap.org";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "0c4a0f7b9dff27d58bfb79aaa0d50f4c";
// "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// units=metric

function init() {
    
    console.log(dayjs().format("MMM D, YYYY"));
    // this will be replaced by calling localstorage and display last saved
    fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);        
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);        
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })
}

function findAPI() {
    var userInput = userInputEl.value;
    userInputEl.value = "";
    console.log(userInput);
    fetch(apiUrl + userInput + "&appid=" + apiKey + "&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayResult(data);
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })
}

function displayResult(data) {
    cityEl.textContent = data.name + " ";
    // this line is not showing up
    dateEl.textContent = dayjs().format("MMM D, YYYY");
    tempEl.textContent = "Temp: " + Math.round(data.main.temp) + "°C";
    windEl.textContent = "Wind: " + data.wind.speed + "km/h";
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

    console.log();
}




init();
submitEl.addEventListener("click", findAPI);