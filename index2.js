var slackbot = require('./helpers/bot'); // import slackbot library
var http = require('http');


http.createServer((req, res) => {}).listen(1337, '127.0.0.1');

slackbot.run();