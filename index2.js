var slackbot = require('./helpers/bot'); // import slackbot library
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var router = require('./helpers/routes');
app.use('/', router);

//http.createServer((req, res) => {}).listen(90, '127.0.0.1');
app.listen(port, function() {
    console.log('app started');
  });

slackbot.run();