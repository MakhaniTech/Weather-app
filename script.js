document.getElementById('searchBtn').addEventListener('click', function() {
  let city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = `Please enter a city name!`;
    return;
  }

  // Capitalize first letter of each word
  city = city.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const apiKey = "f97ee19faf53b690633d27e3987d6595"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},ZA&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = `Fetching weather for ${city}...`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const weatherMain = data.weather[0].main;
        const weatherDesc = data.weather[0].description;

        // Weather icon
        let weatherIcon = '';
        switch(weatherMain.toLowerCase()) {
          case 'clear': weatherIcon = '☀️'; break;
          case 'clouds': weatherIcon = '☁️'; break;
          case 'rain': weatherIcon = '🌧️'; break;
          case 'drizzle': weatherIcon = '🌦️'; break;
          case 'thunderstorm': weatherIcon = '⛈️'; break;
          case 'snow': weatherIcon = '❄️'; break;
          case 'mist':
          case 'fog': weatherIcon = '🌫️'; break;
          default: weatherIcon = '🌡️';
        }

        // Dynamic background
        switch(weatherMain.toLowerCase()) {
          case 'clear':
            document.body.style.background = 'linear-gradient(to bottom, #ffe57f, #ffd740)';
            break;
          case 'clouds':
            document.body.style.background = 'linear-gradient(to bottom, #b0bec5, #78909c)';
            break;
          case 'rain':
          case 'drizzle':
            document.body.style.background = 'linear-gradient(to bottom, #4fc3f7, #0288d1)';
            break;
          case 'thunderstorm':
            document.body.style.background = 'linear-gradient(to bottom, #616161, #212121)';
            break;
          case 'snow':
            document.body.style.background = 'linear-gradient(to bottom, #e1f5fe, #81d4fa)';
            break;
          default:
            document.body.style.background = 'linear-gradient(to bottom, #e0f7fa, #b2ebf2)';
        }

        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${weatherDesc} ${weatherIcon}</p>
          <p>Condition: ${weatherMain}</p>
        `;
      } else {
        resultDiv.innerHTML = `City not found`;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `Error fetching data`;
      console.error(error);
    });
});
