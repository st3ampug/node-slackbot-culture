var express = require('express');
var slackbot = require('./bot'); // import slackbot library
var helpers = require('./helpers');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('GET request for index');
});

router.get('/bot/:q', function(req, res) {
  if(String(req.params.q).toLowerCase() == 'start') {
    slackbot.run();
  } else if (String(req.params.q).toLowerCase() == 'connect') {
    slackbot.ws.close();
    slackbot.ws.open();
  }

  res.send('GET request for bot');
});

module.exports = router;