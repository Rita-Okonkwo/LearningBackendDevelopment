const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/bmiCalculator", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/bmiCalculator", function (req, res) {
    var weight = parseFloat(req.body.num1);
    var height = parseFloat(req.body.num2);
    var bmi = weight / (height * height);
    res.send("Your BMI is " + bmi);
})
app.listen(3000, function () {
    console.log("Listening on port 3000");
});