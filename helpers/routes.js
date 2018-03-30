var express = require('express');
var slackbot = require('./bot'); // import slackbot library

var router = express.Router();

router.get('/', function(req, res) {
  res.send('GET request for index');
});

router.get('/startbot', function(req, res) {
  slackbot.run();
  res.send('GET request for bot');
});

module.exports = router;