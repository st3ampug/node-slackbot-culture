var SlackBot = require('slackbots');
const configs = require('../configs/config.js');
var logger = require('./mylogger.js');
var pokeGoogle = require('./pokeGoogle.js');

var bot = new SlackBot(configs.slack);
const bot_name = configs.slack.name;

exports.run = () => {
    bot.on('start', onStart);
    bot.on('message', onMessage);
    bot.on('open', onOpen);
    bot.on('close', onClose);
    bot.on('error', onError);
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

        // logger.Log('Message object: ' + JSON.stringify(message));
        // logger.Log('Message channel: ' + JSON.stringify(channel));
        // logger.Log('Message user: ' + JSON.stringify(usr));

        if(typeof usr !== 'undefined') {
            if(usr.name !== bot_name) {
                if(typeof channel !== 'undefined') {
                    // Channel specified, need to reply in that channel

                    if(message.text.includes(configs.constants.bot_user)) {                        
                        if(String(message.text).toLowerCase().startsWith(configs.constants.message_to_match_for.toLowerCase())) {
                            bot.postMessageToChannel(channel.name, "Attempting to post your message to the related spreadsheet");
                            pokeGoogle.pushMessageToSheet(message.text, usr.name);

                        } else {
                            bot.postMessageToChannel(channel.name,
                                "Ah I can see I have been mentioned, please start your message with `Hey @" +
                                bot_name + " my suggestion is:` and I will save your suggestion for a topic to be discussed!");
                        }
                    }

                    logger.Log("Reply about to be posted in a channel: " + channel.name);
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

var onOpen = () => {
    logger.Log('Bot event: open');
}

var onClose = () => {
    logger.Log('Bot event: close');
}

var onError = () => {
    logger.Error('Bot event: error');
}

function checkMentionRegex(text) {
    var reg = new RegExp(configs.regex.user_mention);
    return reg.test(text);
}
