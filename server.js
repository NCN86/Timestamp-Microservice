// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get("/api/timestamp/:date_string", (req, res) => {
  const dateString = req.params.date_string;
  let date;
  // If the date string is empty, it should be equivalent to new Date() to
  // return the current time in unix format and UTC format
  // i.e the service uses the current timestamp.
  if (!dateString) {
    date = new Date();
  } else {
        // if dateString is not empty
        // if dateString is an integer, convert dateString to an integer
    if (!isNAN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
    }
  // If the date string is invalid the api returns and error JSON
  // { "error": "Invalid Date" }
  if (date.toString() === 'Invalid Date') {
    res.json({ error: date.toString() });
  } else {
    // If the date string is valid the api returns a JSON like this format { "unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
