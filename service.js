
var express = require('express');
const bodyParser = require('body-parser');

var app = express();

var platos = [{id:1, nombre: "shakshuka"}];

app.use(bodyParser.json());

app.use(logRequest);

var time = new Date();

function logRequest (req, res, next) {
  console.log(`New request created at${time}`);
  next();
}

function middleware (req, res, next) {
  res.send("You shall not pass!");
}

app.get('/platos', function(req, res) {
  res.json(platos);
})

app.post('/platos', (req, res) => {
  platos.push(req.body);
  res.json(platos);
})

app.get('/middleware', middleware, function(req, res) {
  res.send();
})

app.listen(3000, function() {
  console.log('app listening');
})