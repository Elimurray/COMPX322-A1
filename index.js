// console.log("wialohdoiahd");

// async function getSomething() {
//     const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + 37.2 + "&lon=" + 175.11 + "&appid=" + "-")
//         .then((data) => data.json())
//     // console.log(await response.json())
//     return response
// }

// getSomething().then((data) => {
//     console.log(data)
//     let lol = ""
//     console.log("Temp: ", data["main"]["temp"])
//     let something = document.getElementById("test")
//     something.addEventListener("click", () => {
//         console.log(lol)
//     })
// })

// console.log("this is after function call")

// // async
// // fetch
// // promise

// // element

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
        fetch("getDetails.php?id=" + event.id)
          .then((info) => info.json())
          .then((info) => info[0])
          .then((info) => {
            console.log(info);
            infoBox.innerHTML = "";
            //
            Object.keys(info).forEach((key) => {
              const detail = document.createElement("p");
              detail.textContent = `${key}: ${info[key]}`;
              infoBox.appendChild(detail);
            });
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
