// Function to format the object into a string for updating
function formatSet(obj) {
  console.log(Object.keys(obj));

  return Object.keys(obj)
    .map((key) => key + ' = "' + obj[key] + '"')
    .join(",");
}

// Fetch data from the "getEvent.php" to load the event list

(function refresh() {
  fetch("getEvent.php")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const table = document.getElementById("eventTableBody");
      table.innerHTML = "";

      // Create table rows for each event
      data.forEach((event) => {
        const row = document.createElement("tr");
        let name = document.createElement("td");
        let location = document.createElement("td");

        let nameLink = document.createElement("span");
        row.addEventListener("click", () => {
          const infoBox = document.getElementById("info");
          const weatherBox = document.getElementById("weather");
          const infoButtons = document.getElementById("save-buttons");
          weatherBox.style.display = "none";

          // Fetch event details when an event row is clicked
          fetch("getDetails.php?id=" + event.id)
            .then((info) => info.json())
            .then((info) => info[0])
            .then((info) => {
              console.log(info);
              infoBox.innerHTML = "";
              weatherBox.innerHTML = "";

              // Create and append rows for each event detail
              Object.keys(info).forEach((key) => {
                const row = document.createElement("tr");
                const dkey = document.createElement("td");
                const value = document.createElement("td");
                value.classList.add("value");
                dkey.classList.add("key");
                dkey.innerHTML = key;
                value.innerHTML = info[key];
                row.appendChild(dkey);
                row.appendChild(value);
                infoBox.appendChild(row);
              });

              // Create the "Edit" button
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

              // Create the "Save" button
              let saveButton = document.createElement("button");
              saveButton.textContent = "Save";
              saveButton.addEventListener("click", () => {
                let updatedData = {};
                let toEdit = document.getElementsByClassName("value");
                let keys = document.getElementsByClassName("key");

                // Loop through edited fields and prepare the data to be saved
                for (let i = 0; i < keys.length; i++) {
                  if (
                    info[keys[i].innerHTML].trim() !==
                    toEdit[i].innerHTML.trim()
                  ) {
                    if (toEdit[i].innerHTML.includes("<br>")) {
                      toEdit[i].innerHTML = toEdit[i].innerHTML.replace(
                        "<br>",
                        ""
                      );
                    }

                    if (toEdit[i].innerHTML.includes("&nbsp;")) {
                      toEdit[i].innerHTML = toEdit[i].innerHTML.replace(
                        "&nbsp;",
                        ""
                      );
                    }
                    updatedData[keys[i].innerHTML.trim()] =
                      toEdit[i].innerHTML.trim();
                  }
                }

                // Send updated data to the server
                fetch("updateEvent.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: new URLSearchParams({
                    set: formatSet(updatedData),
                    id: info.id,
                  }),
                })
                  .then((response) => response.text())
                  .then((response) => console.log(response))
                  .then(setTimeout(refresh, 100));
              });

              // Create the "Weather" button
              let weatherButton = document.createElement("button");
              weatherButton.textContent = "Weather";
              weatherButton.addEventListener("click", () => {
                weatherBox.innerHTML = "";
                let [lat, lon] = info["lon_lat"].split(",");
                lat = lat.trim();
                lon = lon.trim();

                // Fetch weather information based on event location
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
                    weatherBox.style.display = "block";
                  });
              });

              // Append buttons to the infoButtons container
              infoButtons.innerHTML = "";
              infoButtons.appendChild(weatherButton);
              infoButtons.appendChild(editButton);
              infoButtons.appendChild(saveButton);
            });
        });

        // Append event name and location to the row
        nameLink.innerHTML = event.name;
        name.appendChild(nameLink);
        location.innerHTML = event.location;

        row.appendChild(name);
        row.appendChild(location);
        table.appendChild(row);
      });
    });
})();
