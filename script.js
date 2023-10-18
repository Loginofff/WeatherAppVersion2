async function fetchWeather() {
    try {
        const jsonServerURL = "https://get.geojs.io/v1/ip/geo.json";
        const response = await fetch(jsonServerURL);
        const data = await response.json();
        const latitude = data.latitude;
        const longitude = data.longitude;
        const country = data.country;
        const area_code = data.area_code;
        let weatherType = "";
        switch (area_code) {
            case "0":
                weatherType = "Весьма благоприятная погода ☀️";
                break;
            case "1":
                weatherType = "Благоприятная погода 🌤️";
                break;
            case "2":
                weatherType = "Неблагоприятная погода ☂️";
                break;
            default:
                weatherType = "Неизвестно";
        }
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m`;
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        const currentWeather = weatherData.current;
        const clientCard = document.createElement("div");
        clientCard.classList.add("client-card");
        clientCard.innerHTML = `
            <h2>Погода в месте с координатами:</h2>
            <p>${country}</p>
            <p>${latitude} : ${longitude}</p>
            <p>Текущая температура: ${currentWeather.temperature_2m}°C</p>
            <p>Скорость ветра: ${currentWeather.windspeed_10m} km/h</p>
            <p>Код погоды: ${area_code}</p>
            <p>${weatherType}</p>
        `;
        const clientContainer = document.getElementById("clientContainer");
        clientContainer.appendChild(clientCard);
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}
fetchWeather();