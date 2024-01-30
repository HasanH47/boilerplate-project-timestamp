// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let inputDate;
  if (date) {
    // Check if the input is a valid timestamp or date string
    inputDate = /^\d+$/.test(date) ? new Date(parseInt(date)) : new Date(date);

    if (isNaN(inputDate.getTime())) {
      // Invalid date format
      return res.json({ error: "Invalid Date" });
    }
  } else {
    // If no date is provided, use the current date
    inputDate = new Date();
  }

  const unix = inputDate.getTime();
  const utc = inputDate.toUTCString();

  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
