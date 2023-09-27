var userInputEl = document.getElementById("user-input");
var submitEl = document.getElementById("submit");
var searchHistoryEl = document.getElementById("search-history");
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

var previousUserInput = JSON.parse(localStorage.getItem("previousUserInput"));

function init() {
    console.log(previousUserInput);
    if (!previousUserInput) {
        console.log(!previousUserInput);
        fetch("https://api.openweathermap.org/data/2.5/weather?q=ohio&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayCurrentWeather(data);
                    previousUserInput = [" "];
                    localStorage.setItem("previousUserInput", JSON.stringify(previousUserInput));
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
        // display lastest search
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + previousUserInput[0] + "&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayCurrentWeather(data);
                    displayHistory();
                })
            }
            else {
                alert("Error: " + response.status);
            }
        })
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + previousUserInput[0] + "&appid=0c4a0f7b9dff27d58bfb79aaa0d50f4c&units=metric")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayFutureWeather(data);
                })
            }
        })
    }
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
                // save to localStorage here (unshift the userInput into the first array)
                historyTab(userInput);
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
    cityEl.textContent = data.name + ": " + dayjs().format("MMM D, YYYY");
    var weatherIcon = document.createElement("img");
    weatherIcon.src = weatherIconUrl1 + data.weather[0].icon + weatherIconUrl2;
    iconEl.src = weatherIconUrl1 + data.weather[0].icon + weatherIconUrl2;
    tempEl.textContent = "Temp: " + Math.round(data.main.temp) + "°C";
    windEl.textContent = "Wind: " + data.wind.speed + " km/h";
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    console.log(dayjs().format("DD"));
}

function displayFutureWeather(data) {
    console.log(parseInt(dayjs().format("D")), parseInt(data.list[0].dt_txt.split(" ")[0].split("-")[2]));

    for (x = 0, y = 0; x < 40; x += 8, y++) {
        dayAfterDateEl[y].textContent = data.list[x].dt_txt.split(" ")[0];
        dayAfterIconEl[y].src = weatherIconUrl1 + data.list[x].weather[0].icon + weatherIconUrl2;
        dayAfterTempEl[y].textContent = "Temp: " + Math.round(data.list[x].main.temp) + "°C";
        dayAfterWindEl[y].textContent = "Wind: " + data.list[x].wind.speed + " km/h";
        dayAfterHumidityEl[y].textContent = "Humidity: " + data.list[x].main.humidity + "%";
    }
}

function historyTab(userInput) {
    previousUserInput.unshift(userInput);
    localStorage.setItem("previousUserInput", JSON.stringify(previousUserInput));
    displayHistory();
}

function displayHistory() {
    for(x = 0; x < 5; x++) {
        var searchLists = document.createElement("li");
        searchLists.textContent = previousUserInput[x];
        searchLists.setAttribute("data", previousUserInput[x]);
        searchLists.setAttribute("class", "search-history-list");
        searchLists.addEventListener("click", findPreviousWeather);
        searchHistoryEl.appendChild(searchLists);
    }

    if (searchHistoryEl.children.length >= 10) {
        for(x = 4; x >= 0; x--) {
            searchHistoryEl.children[x].remove();
        }
    }
}

function findPreviousWeather(event) {
    var userClick = event.target.getAttribute("data");
    
    fetch(apiUrl + userClick + "&appid=" + apiKey + "&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCurrentWeather(data);
                historyTab(userClick);
            })
        }
        else {
            alert("Error: " + response.status);
        }
    })

    fetch(apiUrl2 + userClick + "&appid=" + apiKey + "&units=metric")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayFutureWeather(data);
            })
        }
    })
}

init();
submitEl.addEventListener("click", findAPI);