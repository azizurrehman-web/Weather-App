function checkweather() {
  const cityRef = document.querySelector("#cityName");
  const cityName = cityRef.value.trim();
  const weatherRef = document.querySelector("#weather");

  if (cityName === "") {
    weatherRef.innerHTML = "Please enter city name";
    return;
  }

  fetch(
    `https://p2pclouds.up.railway.app/v1/learn/weather?city=${encodeURIComponent(cityName)}`,
  )
    .then((response) => {
      console.log("Response:", response);
      console.log("Status:", response.status);

      if (!response.ok) {
        throw new Error("City not found");
      }

      return response.json();
    })

    .then((data) => {
      console.log("Weather Data:", data);

      // Location
      const locationName = data.location.name;
      const locationRegion = data.location.region;
      const locationCountry = data.location.country;
      const localTime = data.location.localtime;

      // Current Weather
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const feelsLike = data.current.feelslike_c;

      // Other information
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;
      const windDirection = data.current.wind_dir;
      const windDegree = data.current.wind_degree;
      const cloud = data.current.cloud;
      const visibility = data.current.vis_km;

      weatherRef.innerHTML = `
        <h2>🌤️ ${locationName}</h2>

        <p>📍 Region: ${locationRegion}</p>

        <p>🌎 Country: ${locationCountry}</p>

        <p>🕐 Local Time: ${localTime}</p>

        <hr>

        <h3>🌡️ Temperature</h3>
        <p>${temp}°C / ${((temp * 9) / 5 + 32).toFixed(1)}°F</p>

        <h3>☁️ Weather</h3>
        <p>${condition}</p>

        <img 
          src="https:${icon}" 
          alt="${condition}"
        >

        <p>🌡️ Feels Like: ${feelsLike}°C</p>

        <hr>

        <h3>💧 Humidity</h3>
        <p>${humidity}%</p>

        <h3>💨 Wind</h3>
        <p>${wind} kph</p>

        <p>🧭 Wind Direction: ${windDirection}</p>

        <p>📐 Wind Degree: ${windDegree}°</p>

        <h3>☁️ Cloud Coverage</h3>
        <p>${cloud}%</p>

        <h3>👁️ Visibility</h3>
        <p>${visibility} km</p>
      `;
    })

    .catch((error) => {
      console.log("ERROR:", error);

      weatherRef.innerHTML = `
        <p>❌ Something went wrong.</p>
        <p>Please check the city name.</p>
      `;
    });
}
