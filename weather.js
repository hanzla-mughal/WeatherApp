

        

        async function getWeather() {

            let city = document.getElementById("city").value;

            try {

                let weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                let response = await fetch(weather_api);
                let data = await response.json();


                if (data.cod === "404") {
                    document.getElementById('temp').innerHTML = "City Not found";
                }

                else {

                    let temp = data.main.temp;
                    let cityName = data.name;
                    let humidity = data.main.humidity;
                    let wind = data.wind.speed;

                    let description = data.weather[0].main;
                    document.getElementById('temp').innerHTML = "🌡️ Temperature: " + temp + "°C";
                    document.getElementById('Name').innerHTML = cityName;
                    document.getElementById('Desc').innerHTML = description;
                    document.getElementById('humidity').innerHTML = "💧 Humidity: " + humidity + "%";
                    document.getElementById('wind').innerHTML = "💨 Wind: " + wind + " m/s";

                    let icon = data.weather[0].icon;
                    let url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                    document.getElementById('icon').src = url;
                    changeBackground(description);
                    forecast();
                }
            }
            catch (error) {
                console.log("Error:", error);

            }
        };

        function changeBackground(weather) {
            const body = document.body;
            if (weather === "Clouds") {
                body.style.backgroundImage = `url('images/Cloudy.jpeg')`;
            }
            else if (weather === "Clear") {
                body.style.backgroundImage = `url('images/sunny.jpg')`;
            }
            else if (weather === "Rain") {
                body.style.backgroundImage = `url('images/rain.jpg')`;
            }
            else {
                body.style.background = "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)";
            }

            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";
            body.style.backgroundRepeat = "no-repeat";

        };
        async function forecast() {
            let city = document.getElementById('city').value;
            let forecastDiv = document.getElementById('forecast');
            try {
                let weather_api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
                let response = await fetch(weather_api);
                let data = await response.json();
                for(let i=0;i<40;i+=8)
            {
                let day=data.list[i];
              let date = new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'long'});

                let temp=day.main.temp;
                let icon=day.weather[0].icon;
               forecastDiv.innerHTML+=
               `<div class=forecast-card>
                <p>${date}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <p>${temp}°C</p>
            </div>`

            }
            

            }
            catch (error) {
                console.log("Error", error);
            }
        }








    