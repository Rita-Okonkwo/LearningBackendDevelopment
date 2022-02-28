const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({ extended: true })); 

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const key = req.body.api;
    const city = req.body.city;
    const url = "https://api.weatherapi.com/v1/current.json?q=" + city + "&key=" + key;
    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const regionData = weatherData.location.region;
            const iconUrl = "https://api.weatherapi.com" + weatherData.current.condition.icon;
            const tempData = weatherData.current.temp_c;
            res.write("<h1>The location region is " + regionData + "</h1>");
            res.write("The current temperature is " + tempData + " degree celsius.")
            res.write("<img src=" + iconUrl + "alt='showing the weather condition'/>");
            res.send()
        })
    })
})

app.listen(3000, function () {
    console.log("Server is listening on port 3000");
})
