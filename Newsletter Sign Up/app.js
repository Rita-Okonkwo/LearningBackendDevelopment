const e = require("express");
const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //loading static files remotely

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/" + process.env.LIST_ID;
    const options = {
        method: "POST",
        auth: "rita:" + process.env.API_KEY
    };

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            const jData = JSON.parse(data);
            const err = jData.errors;
            if (err.length === 0) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server now listening on port 3000");
});