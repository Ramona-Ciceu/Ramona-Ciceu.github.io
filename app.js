// Your WeatherAPI.com API key
const apiKey = '40eed157c5f0493d9ff133245240609'; // Replace with your actual API key

// Get references to HTML elements
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const conditions = document.getElementById('conditions');
const windSpeed = document.getElementById('wind-speed');
const uvIndex = document.getElementById('uv-index');

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
    const today = new Date(); // Get current date
    const dateString = today.toLocaleDateString(); // Format the date

    cityName.textContent = `City: ${data.location.name}`;
    dateElement.textContent = `Date: ${dateString}`;
    temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    conditions.textContent = `Conditions: ${data.current.condition.text}`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`; 
    uvIndex.textContent = `UV Index: ${data.current.uv}`; 
}
