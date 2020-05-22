// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var bodyParser = require("body-parser");
app.set('port', 5000);
//Routing folders 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static(path.join(__dirname, './static/js')));
app.use('/design', express.static(path.join(__dirname, './static/design')));
app.use('/img', express.static(path.join(__dirname, './static/img')));

// Routing for pages
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/home.html'));
});
app.get('/sign', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/sign.html'));
});
app.get('/main', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/main.html'));
});
app.get('/course', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/course.html'));
});
app.get('/profile', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/profile.html'));
});
app.get('/search', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/search.html'));
});
app.get('/settings', function(request, response) {
  response.sendFile(path.join(__dirname, './static/html/settings.html'));
});
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
