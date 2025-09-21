document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = `Please enter a city name!`;
    return;
  }

  const apiKey = "f97ee19faf53b690633d27e3987d6595"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = `Fetching weather for ${city}...`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
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
