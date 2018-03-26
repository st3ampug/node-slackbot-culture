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
        bot_user: '<@U9R87EK45>'
    },
    google: {
        //"SHEETID": process.env.G_SHEET_ID,
        "SHEETID": "1pG1E9XCzg9M_26gU3Lah-SSovZWfI14X3-BgokYzvZU",
        "SHEETNUMBER": 1 // first sheet of the document
    }
}