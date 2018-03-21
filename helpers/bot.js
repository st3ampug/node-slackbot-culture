var SlackBot = require('slackbots');
const bot_name = "culture-group";

var bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: bot_name
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

      console.log(usr);
  
      if(typeof usr !== 'undefined') {
        if(usr.name !== bot_name) {
            bot.postMessageToUser("bpolgar", "You rang?");
        }
      } else {
          console.error("usr obj undefined");
      }
    }
  }