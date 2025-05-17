const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'your api key',
    'x-rapidapi-host': 'host-link'
  }
};

const getWeather = (city) => {
  const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      document.getElementById("city_name").innerText = data.name;

      const tempC = (data.main.temp - 273.15).toFixed(2);
      const feelsC = (data.main.feels_like - 273.15).toFixed(2);
      const minC = (data.main.temp_min - 273.15).toFixed(2);
      const maxC = (data.main.temp_max - 273.15).toFixed(2);

      document.getElementById("temp_main").innerText = tempC;
      document.getElementById("temp_desc").innerText = tempC;
      document.getElementById("min_temp").innerText = minC;
      document.getElementById("max_temp").innerText = maxC;

      document.getElementById("humidity_main").innerText = data.main.humidity;
      document.getElementById("wind_degrees").innerText = data.wind.deg + "°";
      document.getElementById("feels_like").innerText = feelsC;
      document.getElementById("humidity_desc").innerText = data.main.humidity + " %";

      const windSpeedKmph = (data.wind.speed * 3.6).toFixed(2);
      document.getElementById("wind_speed_main").innerText = windSpeedKmph;
      document.getElementById("wind_speed_desc").innerText = windSpeedKmph;

      document.getElementById("sunrise").innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      document.getElementById("sunset").innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Unable to fetch weather data. Try another city.");
    });
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (city) {
    getWeather(city);
  }
});

getWeather("Delhi");
