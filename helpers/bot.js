var SlackBot = require('slackbots');
const configs = require('./config.js');
var logger = require('./mylogger.js');

var bot = new SlackBot(configs.slack);
const bot_name = configs.slack.name;

exports.run = () => {
    bot.on('start', onStart);
    bot.on('message', onMessage);
}

var onStart = () => {
    logger.Log('Bot started');
}

var onMessage = (message) => {
    logger.Log('onMessage');

    users = [];
    channels = [];
    var botUsers = bot.getUsers();
    users = botUsers._value.members;
    var botChannels = bot.getChannels();
    channels = botChannels._value.channels;

    logger.Log('Incoming message type: ' + message.type);

    if(message.type === 'message' && Boolean(message.text)) {
        var channel = channels.find(channel => channel.id === message.channel);
        var usr = users.find(user => user.id === message.user);

        logger.Log('Message object: ' + JSON.stringify(message));
        logger.Log('Message channel: ' + JSON.stringify(channel));
        logger.Log('Message user: ' + JSON.stringify(usr));

        if(typeof usr !== 'undefined') {
            if(usr.name !== bot_name) {
                if(typeof channel !== 'undefined') {
                    logger.Log("Reply about to be posted in a channel: " + channel.name);
                    bot.postMessageToChannel(channel.name, "Your rang?");
                } else {
                    logger.Log("Reply about to be posted in a pm: " + usr.name);
                    bot.postMessageToUser(usr.name, "Your rang?");
                }
            }
        } else {
            logger.Error("usr obj undefined");
        }
    }
}