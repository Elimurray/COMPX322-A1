console.log("wialohdoiahd");

async function getSomething() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + 37.2 + "&lon=" + 175.11 + "&appid=" + "-")
        .then((data) => data.json())
    // console.log(await response.json())
    return response
}

getSomething().then((data) => {
    console.log(data)
    let lol = ""
    console.log("Temp: ", data["main"]["temp"])
    let something = document.getElementById("test")
    something.addEventListener("click", () => {
        console.log(lol)
    })
})

console.log("this is after function call")

// async
// fetch
// promise

// element