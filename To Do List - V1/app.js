const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var items = ["Study Algo", "Catch up on AWS course", "Complete Backend course module"];

app.get("/", function (req, res) {
    const day = date.myDate();
    res.render("list", { dayOfTheWeek: day, newItems: items });
    
});

app.post("/", function (req, res) {
    var item = req.body.item1;
    items.push(item);
    res.redirect("/");
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function (req, res) {
    console.log("Start listening on port 3000");
});