// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  var date = new Date()
  result = {
    unix: date.valueOf(),
    utc: date.toUTCString()
  }
  res.json(result)
})

app.get("/api/:date", (req, res) => {
  // date cam be formatted as 
  // 1. 2015-10-01
  // 2. a unix time stamp ie: 1451001600000
  var invalidDate = false

  date = new Date(req.params.date)
  if (date == 'Invalid Date' ) {
    // it might be a unix timestamp
    date = new Date(Number(req.params.date))
    if ( date == 'Invalid Date') {
      // we have an invalid date 
      // send error to user
      invalidDate = true
    }
  }
  var result;

  if (invalidDate) {
    result = {error: "Invalid Date"}
  } else {
    result = {
      unix: date.valueOf(),
      utc: date.toUTCString()
    }
  }
  
 

  res.json(result)
})


// listen for requests :)
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
