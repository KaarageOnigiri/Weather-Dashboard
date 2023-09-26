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

// -2) Display the weather icons with src, don't need to fetch again.
// 3) Set up local storage, then search history bar.
// 4) init function will call up local storage (optional) and then display 
//    the latest successful search result in the form of search history bar.

// all that's left is to do the local storage and history bar.

var previousUserInput = JSON.parse(localStorage.getItem("previousUserInput"));

function init() {
    console.log(previousUserInput);
    if (!previousUserInput) {
        console.log("run");
        fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
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
    
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayFutureWeather(data);
                })
            }
        })
    }
    else {
        // display lastest search, but first, change to fetch link
        fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
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
        // change the fetch link
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayFutureWeather(data);
                })
            }
        })
    }

    
    // console.log(dayjs().format("MMM D, YYYY"));

    // fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
    // .then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);        
    //         })
    //     }
    //     else {
    //         alert("Error: " + response.status);
    //     }
    // })

    // fetch("https://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
    // .then(function(response) {
    //     if (response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //         })
    //     }
    // })
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
                // save to localStorage here (splice the userInput into the first array)
                console.log(previousUserInput);
                console.log(previousUserInput.unshift(userInput));
                console.log(previousUserInput);
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
    historyTab();
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
    console.log(data);
    console.log();
    console.log(parseInt(dayjs().format("D")), parseInt(data.list[0].dt_txt.split(" ")[0].split("-")[2]));
    // this is to make sure the first day of the future 5 days doesn't overlap with current day
    for (x = 0, y = 0; x < 40; x += 8, y++) {
        console.log(dayAfterDateEl[0]);
        dayAfterDateEl[y].textContent = data.list[x].dt_txt.split(" ")[0];
        dayAfterIconEl[y].src = weatherIconUrl1 + data.list[x].weather[0].icon + weatherIconUrl2;
        dayAfterTempEl[y].textContent = "Temp: " + Math.round(data.list[x].main.temp) + "°C";
        dayAfterWindEl[y].textContent = "Wind: " + data.list[x].wind.speed + " km/h";
        dayAfterHumidityEl[y].textContent = "Humidity: " + data.list[x].main.humidity + "%";
    }
}

// dayAfterEl[x] = document.getElementById("day-after-" + y);
// dayAfterDateEl[x] = document.getElementById("day-after-" + y + "-date");
// dayAfterIconEl[x] = document.getElementById("day-after-" + y + "-icon");
// dayAfterTempEl[x] = document.getElementById("day-after-" + y + "-temp");
// dayAfterWindEl[x] = document.getElementById("day-after-" + y + "-wind");
// dayAfterHumidityEl[x] = document.getElementById("day-after-" + y + "-humidity");

function historyTab() {
    previousUserInput;
    localStorage.setItem("previousUserInput", JSON.stringify(previousUserInput));
}

// previousQuizScores.splice(x, 0, timeLeft);
// previousQuizParticipants.splice(x, 0, userInput.value);
// localStorage.setItem("previousQuizParticipants", JSON.stringify(previousQuizParticipants));
// localStorage.setItem("previousQuizHighScores", JSON.stringify(previousQuizScores));

init();
submitEl.addEventListener("click", findAPI);