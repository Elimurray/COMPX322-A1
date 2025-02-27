fetch("getEvent.php")
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    const table = document.getElementById("eventTable");
    data.forEach((event) => {
      const row = document.createElement("tr");
      let name = document.createElement("td");
      let location = document.createElement("td");

      let nameLink = document.createElement("span");
      nameLink.addEventListener("click", () => {
        const infoBox = document.getElementById("info");
        const weatherBox = document.getElementById("weather");

        fetch("getDetails.php?id=" + event.id)
          .then((info) => info.json())
          .then((info) => info[0])
          .then((info) => {
            console.log(info);
            infoBox.innerHTML = "";
            weatherBox.innerHTML = "";
            //
            Object.keys(info).forEach((key) => {
              const detail = document.createElement("p");
              detail.textContent = `${key}: ${info[key]}`;
              infoBox.appendChild(detail);
            });
            let button = document.createElement("button");
            button.addEventListener("click", () => {
              weatherBox.innerHTML = "";
              let [lat, lon] = info["lon_lat"].split(",");
              lat = lat.trim();
              lon = lon.trim();

              fetch("getWeather.php?lat=" + lat + "&lon=" + lon)
                .then((weather) => weather.json())
                .then((weather) => {
                  console.log(weather);
                  let temp = document.createElement("p");
                  let humidity = document.createElement("p");
                  let description = document.createElement("p");

                  temp.innerHTML = "Temp: " + weather.main.temp;
                  humidity.innerHTML = "Humidity: " + weather.main.humidity;
                  description.innerHTML =
                    "Description: " + weather.weather[0].description;
                  weatherBox.appendChild(temp);
                  weatherBox.appendChild(humidity);
                  weatherBox.appendChild(description);
                });
            });
            infoBox.appendChild(button);
          });
      });

      nameLink.innerHTML = event.name;
      name.appendChild(nameLink);

      location.innerHTML = event.location;

      row.appendChild(name);
      row.appendChild(location);
      table.appendChild(row);
    });
  });
