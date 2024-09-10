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
const forecastGrid = document.getElementById('forecast-grid');

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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
            updateForecastInfo(data.forecast.forecastday);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

// Function to update the weather information on the page
function updateWeatherInfo(data) {
    const today = new Date(); // Get current date
    const dateString = today.toLocaleDateString(); // Format the date

    cityName.textContent = `City: ${data.location.name}`;
    dateElement.textContent = `Date: ${today}`;
    temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    conditions.textContent = `Conditions: ${data.current.condition.text}`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`; 
    uvIndex.textContent = `UV Index: ${data.current.uv}`; 
}

// Function to update the 5-day forecast
function updateForecastInfo(forecastData) {
    const forecastGrid = document.getElementById('forecast-grid');
    if (!forecastGrid) {
        console.error('Element with ID forecast-grid not found');
        return;
    }
    forecastGrid.innerHTML = ''; // Clear previous forecast

    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // Get the day of the week (e.g., Monday, Tuesday, etc.)
        const date = new Date(day.date);
        const options = { weekday: 'long' }; 
        const dayName = date.toLocaleDateString(undefined, options);
        const temp = `${day.day.avgtemp_c} °C`;
        const condition = day.day.condition.text;
        const icon = `https:${day.day.condition.icon}`; 

        forecastItem.innerHTML = `
            <p>${dayName}</p>
            <img src="${icon}" alt="${condition}">
            <p>Temp: ${temp}</p>
            <p>${condition}</p>
        `;

        forecastGrid.appendChild(forecastItem);
    });
}
