module.exports = {
    slack: {
        token: process.env.BOT_TOKEN,
        name: process.env.BOT_NAME
    },
    date: {
        format: 'Y-m-d H:M:S'
    },
    debug: {
        state: process.env.DEBUG_STATE
    },
    regex: {
        user_mention: '<@.*>'        
    },
    constants: {
        bot_user: '<@U9R87EK45>',
        message_to_match_for: "Hey <@U9R87EK45> my suggestion is"
    },
    google: {
        "SHEETID": process.env.G_SHEET_ID,
        "SHEETNUMBER": 1 // first sheet of the document
    }
}