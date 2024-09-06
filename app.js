// Your WeatherAPI.com API key
const apiKey = '0433a80e18c54a0c807122134240609'; // Replace with your actual API key

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
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
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
    cityName.textContent = `City: ${data.location.name}`;
    temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    conditions.textContent = `Conditions: ${data.current.condition.text}`;
}
