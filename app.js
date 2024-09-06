// Your OpenWeatherMap API key
const apiKey = fMxGZ84ppC5LOw1T9fCcYRjtteuWBrZU;

// Get references to HTML elements
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const conditions = document.getElementById('conditions');

// Add an event listener to the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data
function getWeatherData(city) {
    // API URL with city and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to update the weather information on the page
function updateWeatherInfo(data) {
    cityName.textContent = `City: ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
}
