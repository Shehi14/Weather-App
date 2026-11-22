let weather = document.getElementById('weather');

let cityInput = document.getElementById('cityInput');
let searchBtn = document.getElementById('searchBtn');
let cityResults = document.getElementById('cityResults');

const dataCall = async () => {
 
    searchBtn.addEventListener('click', async () => {

        let city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

    

        let api = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

        let response = await fetch(api);
        let myData = await response.json();

        console.log(myData.results);

        if (!myData.results || myData.results.length === 0) {
            cityResults.innerHTML = 'City not found!';
            weather.innerHTML = '';
            return;
        }
     

        // Display all matching cities

        cityResults.innerHTML = '';

        myData.results.forEach((item, index) => {

            let button = document.createElement('button');

            button.innerText = `${item.name}, ${item.country}`;

            button.addEventListener('click', () => {
                cityResults.innerHTML = '';
                getWeather(item);
            });

            cityResults.appendChild(button);

        });

    });

};

// Fetch weather for the selected city

const getWeather = async (cityData) => {

    let cityName = cityData.name;
    let country = cityData.country;
    let latitude = cityData.latitude;
    let longitude = cityData.longitude;

    let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    let weatherResponse = await fetch(weatherURL);
    let weatherData = await weatherResponse.json();

    console.log(weatherData);

    weather.innerHTML = `<div class="weather-card">
        <h2>Weather in ${cityName}, ${country}</h2>
        <h1>${weatherData.current.temperature_2m}°C</h1>
        <p>💧 Humidity: ${weatherData.current.relative_humidity_2m}%</p>
        <p>🌬️ Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
    </div>`;

};

dataCall();