let weatherValue = document.getElementById("weatherValue");
let feelsLike = document.getElementById("feelsLike");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");

const AQIURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=0eb2b840d53255297795ddcca37052e5&q=kochi";

fetch(AQIURL).then(res => res.json()).then(data => {
    console.log(data);
    console.log(Math.round(data.main.temp));

    let weatherValueApi = Math.round(data.main.temp);
    let feelsLikeVal = Math.round(data.main.feels_like);
    let humidityVal = data.main.humidity;
    let windVal = data.wind.speed;

    weatherValue.innerHTML = weatherValueApi + "°c";
    feelsLike.innerHTML = feelsLikeVal + "°c";
    humidity.innerHTML = humidityVal + "%";
    windSpeed.innerHTML = windVal+ "km/h";

    console.log(windVal)
}).catch(e => {
    console.log(e);
})
