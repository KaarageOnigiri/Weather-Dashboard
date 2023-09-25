var userInputEl = document.getElementById("user-input");
var submitEl = document.getElementById("submit");
var seachHistoryEl = document.getElementById("search-history");
var searchResultEl = document.getElementById("search-result");
var fiveDayForecastEl = document.getElementById("five-day-forecast");
var cityEl = document.getElementById("city");
var iconEl = document.getElementById("icon");
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
var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "0c4a0f7b9dff27d58bfb79aaa0d50f4c";
var weatherIconUrl1 = "https://openweathermap.org/img/wn/";
var weatherIconUrl2 = "@2x.png";
// "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// https://openweathermap.org/weather-conditions  (icons)
// units=metric

// 1) check if the data.list[0] is the same as today's date, if not,
//    run 0, 8, 16, 24, 32, if yes, run 8, 16, 24, 32, 40.
// 2) Display the weather icons with src, don't need to fetch again.
// 3) Set up local storage, then search history bar.
// 4) init function will call up local storage (optional) and then display 
//    the latest successful search result.

function init() {
    
    console.log(dayjs().format("MMM D, YYYY"));
    // this will be replaced by calling localstorage and display last saved
    fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
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

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                
                for (x = 0; x < data.list.length; x+=8) {
                    console.log(data.list[x]);
                }
                console.log(parseInt(dayjs().format("D")), parseInt(data.list[0].dt_txt.split(" ")[0].split("-")[2]));
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
                displayCurrentWeather(data);
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })

    fetch(apiUrl2 + userInput + "&appid=" + apiKey + "&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayFutureWeather(data);
            })
        }
    })
}

function displayCurrentWeather(data) {
    cityEl.textContent = data.name + " " + dayjs().format("MMM D, YYYY");
    var weatherIcon = document.createElement("img");
    weatherIcon.src = weatherIconUrl1 + data.weather[0].icon + weatherIconUrl2;

    iconEl.src = weatherIconUrl1 + data.weather[0].icon + weatherIconUrl2;

    console.log(weatherIcon.src);
    tempEl.textContent = "Temp: " + Math.round(data.main.temp) + "°C";
    windEl.textContent = "Wind: " + data.wind.speed + " km/h";
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    console.log(dayjs().format("DD"));
}

function displayFutureWeather(data) {
    console.log("displayFutureWeather");
    
}



init();
submitEl.addEventListener("click", findAPI);