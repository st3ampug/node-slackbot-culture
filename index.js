var slackbot        = require('./helpers/bot'); // import slackbot library
var logger          = require('./helpers/mylogger.js');
var express         = require('express');
var router          = require('./helpers/routes');

var app             = express();
var port            = process.env.PORT || 8080;


app.use('/', router);

app.listen(port, function() {
  logger.Log('app started');
});

slackbot.run();