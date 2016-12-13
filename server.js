
//express to run server
var express = require('express');

//start up an instance of app. This needs to go before any of the things below which are attached to the app
var app = express();
//connecting app to website folder which has index.html and sketch.js to run a website connected to this server/app
app.use(express.static('website'));

//cors for cross origin aloowance
var cors = require('cors');
app.use(cors());

//requring the node file read in system
var fs = require('fs')

//body-parser to work with json files
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Set up the server
var server = app.listen(3000, listen);

//callback to debug
function listen(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}


var creed;

  // Read the file
  var data = fs.readFileSync('website/creed.json', 'utf8');
	console.log(data);
  // Parse it  back to object
  creed = JSON.parse(data);
	// console.log(cards);

// Now here we take a POST request. And create a directory for it to be sent to. This needs to be the same as the one referenced in sketch.js
app.post('/creed', example);

function example(req, res){
	var creedLine = req.body.string
	console.log(creedLine);
	//this is coming in as an object: how do I make it just a string? or change the whole thing to a javascript object
	// {string:"what i want"}

	creed.push(creedLine);
	 var json = JSON.stringify(creed);
	 console.log(creed);

  fs.writeFileSync('website/creed.json', json);
  res.send(creed);
}