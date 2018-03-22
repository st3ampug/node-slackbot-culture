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
                    // Channel specified, need to reply in that channel

                    logger.Log("Reply about to be posted in a channel: " + channel.name);
                    bot.postMessageToChannel(channel.name, "Your rang?");
                } else {
                    // No channel specified, need to reply in a pm to the user

                    logger.Log("Reply about to be posted in a pm: " + usr.name);
                    bot.postMessageToUser(usr.name, "Your rang?");
                }
            } else {
                logger.Log("Bots own message, not replying");
            }
        } else {
            logger.Error("usr obj undefined");
        }
    }
}

// TODO
// Take a look at how to address the bot for it to then save the suggestions