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
              const row = document.createElement("tr");
              const dkey = document.createElement("td");
              const value = document.createElement("td");
              value.classList.add("value");
              dkey.innerHTML = key + ": ";
              value.innerHTML = info[key];
              row.appendChild(dkey);
              row.appendChild(value);
              infoBox.appendChild(row);
            });
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
              let toEdit = document.getElementsByClassName("value");
              toEdit = Array.from(toEdit);
              toEdit.forEach((p) => {
                p.setAttribute("contenteditable", "true");
                p.style.border = "solid thin black";
              });
            });

            let saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.addEventListener("click", () => {
              let updatedData = {};
              let toEdit = document.getElementsByClassName("value");

              Array.from(toEdit).forEach((p) => {
                let key = p.previousSibling.textContent.replace(": ", "");
                let value = p.textContent;
                updatedData[key] = value;
              });
            });

            let weatherButton = document.createElement("button");
            weatherButton.textContent = "Weather";
            weatherButton.addEventListener("click", () => {
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
            infoBox.appendChild(weatherButton);
            infoBox.appendChild(editButton);
            infoBox.appendChild(saveButton);
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
