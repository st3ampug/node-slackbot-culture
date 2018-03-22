var SlackBot = require('slackbots');

var bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: process.env.BOT_NAME
});

exports.run = () => {
    bot.on('start', onStart);
    bot.on('message', onMessage);
}

var onStart = () => {
    console.log('Bot started');
}

var onMessage = (message) => {
    users = [];
    channels = [];
    var botUsers = bot.getUsers();
    users = botUsers._value.members;
    var botChannels = bot.getChannels();
    channels = botChannels._value.channels;
  
    if(message.type === 'message' && Boolean(message.text)) {
      var channel = channels.find(channel => channel.id === message.channel);
      var usr = users.find(user => user.id === message.user);
  
      if(typeof usr !== 'undefined') {
        if(usr.name !== bot_name) {
            bot.postMessageToUser("bpolgar", "You rang?");
        }
      } else {
          console.error("usr obj undefined");
      }
    }
  }