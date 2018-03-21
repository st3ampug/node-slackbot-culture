//const RtmClient     = require('@slack/client').RtmClient;
const { RTMClient } = require('@slack/client');
const WebClient     = require('@slack/client').WebClient;
const RTM_EVENTS    = require('@slack/client').RTM_EVENTS;

const bot_token     = process.env.BOT_TOKEN;
const rtm           = new RTMClient(bot_token);
const web           = new WebClient(bot_token);

const robotName     = process.env.BOT_NAME;
const allCommands   = ['issue:', 'command2:'];

let users = [];

function executeCommand(command, args) {
    console.log(command, args);
}

function updateUsers(data) {
    users = data.members;
}

function getUsernameFromId(id) {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'unknown member';
}

rtm.on('message', function handleRtmMessage(message) {
    if (message.type === 'message' && message.text) {
        const userName = getUsernameFromId(message.user);
        if (userName !== robotName) {
            if (message.text.indexOf(robotName) !== -1) {
                rtm.sendMessage('Hey ' + userName + ', I heard that!', message.channel);
            }
            if (message.text.indexOf(':') !== -1) {
                allCommands.forEach((command) => {
                    if (message.text.indexOf(command) === 0) {
                        const args = message.text.substring(command.length);
                        executeCommand(command, args);
                    }
                });
            }
        }
    }
});

web.users.list((err, data) => {
    if (err) {
        console.error('web.users.list Error:', err);
    } else {
        updateUsers(data);
    }
});

rtm.start();