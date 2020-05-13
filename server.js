// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var unirest = require('unirest');
var bodyParser = require("body-parser");
app.set('port', 5000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static(path.join(__dirname, './static/js')));
app.use('/design', express.static(path.join(__dirname, './static/design')));

// Routing for pages
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/home.html'));
});
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
