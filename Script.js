document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');
  
  if(city) {
    resultDiv.innerHTML = `Fetching weather for <strong>${city}</strong>... 🌤️`;
  } else {
    resultDiv.innerHTML = `Please enter a city name! ❌`;
  }
});
