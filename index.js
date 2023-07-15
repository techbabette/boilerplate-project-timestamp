// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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

class DateFormatter{
  static formatToUTC(dateObject){
    if(dateObject.toString() === "Invalid Date") return {error : "Invalid Date"};
    return {unix : dateObject.getTime(), utc : dateObject.toUTCString()};
  }
}

app.get("/api/:date?", function(req,res){
  //If no date is provided
  if(!req.params.date){
    let currentDate = new Date();
    let returnObject = DateFormatter.formatToUTC(currentDate);
    res.json(returnObject);
    return;
  }

  let sentDateString = req.params.date;
  let sentDateObject;

  //If date string is not a timestamp
  if(isNaN(sentDateString)){
    sentDateObject = new Date(sentDateString);
  }
  //If date string is a timestamp
  else{
    sentDateObject = new Date(parseInt(sentDateString));
  }

  let returnObject = DateFormatter.formatToUTC(sentDateObject);
  res.json(returnObject);
})

// listen for requests :)
let port = process.env.port ?? 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
