let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");
let cityName = document.getElementById("cityName");
let weatherValue = document.getElementById("weatherValue");
let feelsLike = document.getElementById("feelsLike");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let aqiValue = document.getElementById("aqiValue");
let condition = document.getElementById("condition");
let pmValue1 = document.getElementById("pmValue1");
let pmValue2 = document.getElementById("pmValue2");
let co = document.getElementById("co");
let no = document.getElementById("no");
let no2 = document.getElementById("no2");
let o3 = document.getElementById("o3");
let so2 = document.getElementById("so2");
let nh3 = document.getElementById("nh3");
let dateDisplay = document.getElementById("date");
let lat = 0;
let lon = 0;

const WEATHERAPI = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=0eb2b840d53255297795ddcca37052e5&q=';

function getWeathertData() {
    fetch(WEATHERAPI + searchBox.value).then(res => res.json()).then(data => {
        console.log(data);
        cityName.innerHTML = data.name;
        weatherValue.innerHTML = Math.round(data.main.temp) + "°c";
        feelsLike.innerHTML = Math.round(data.main.feels_like) + "°c";
        humidity.innerHTML = data.main.humidity + "%";
        windSpeed.innerHTML = data.wind.speed + "km/h";
        lat = data.coord.lat;
        lon = data.coord.lon;

        const AQIURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=0fe2bb52b02bfef86aef31e2c09e7e56`;

        fetch(AQIURL).then(res => res.json()).then(data => {
            console.log("AQI");
            console.log(data);
            aqiValue.innerHTML = data.list[0].main.aqi;
            pmValue1.innerHTML = data.list[0].components.pm2_5 + " μg/m3";
            pmValue2.innerHTML = data.list[0].components.pm10 + " μg/m3";
            co.innerHTML = data.list[0].components.co + " μg/m3";
            no.innerHTML = data.list[0].components.no + " μg/m3";
            no2.innerHTML = data.list[0].components.no2 + " μg/m3";
            o3.innerHTML = data.list[0].components.o3 + " μg/m3";
            so2.innerHTML = data.list[0].components.so2 + " μg/m3";
            nh3.innerHTML = data.list[0].components.nh3 + " μg/m3";

            const aqiConditions = {
                1: "Good",
                2: "Fair",
                3: "Moderate",
                4: "Poor",
                5: "Very Poor"
            };

            condition.innerHTML = aqiConditions[data.list[0].main.aqi] || "Unknown";


            console.log(`AQI : ${data.list[0].main.aqi}`);
            console.log(`pm1 : ${data.list[0].components.pm2_5}`);
            console.log(`pm2 : ${data.list[0].components.pm10}`);
            console.log(`co : ${data.list[0].components.co}`);
            console.log(`no : ${data.list[0].components.no}`);
            console.log(`no2 : ${data.list[0].components.no2}`);
            console.log(`o3 : ${data.list[0].components.o3}`);
            console.log(`so2 : ${data.list[0].components.so2}`);
            console.log(`nh3 : ${data.list[0].components.nh3}`);

        }).catch(e => {
            console.log(e);
        })

        console.log(`city : ${data.name}`);
        console.log(`weather : ${Math.round(data.main.temp)}`);
        console.log(`feels : ${Math.round(data.main.feels_like)}`);
        console.log(`humidity: ${data.main.humidity}`);
        console.log(`wind : ${data.wind.speed}`);
        console.log(`lat : ${data.coord.lat}`);
        console.log(`lon : ${data.coord.lon}`);
        
        return lat, lon;
    }).catch(e => {
        console.log(e);
    })

}

function getFormattedDate(dateInput = new Date()) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = days[dateInput.getDay()];
    const month = months[dateInput.getMonth()];
    const date = dateInput.getDate();
    dateDisplay.innerHTML = day + "," + month + " " + date;
}

getFormattedDate();

searchButton.addEventListener("click", function () {
    getWeathertData();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeathertData();
    }
});

