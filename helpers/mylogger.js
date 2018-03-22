var dateTime = require('node-datetime');
const configs = require("./config.js");

function Log(txt) {
    if(configs.debug.state) {
        console.log(getFormattedDate() + ": " + txt);
    }
}

function Error(txt) {
    if(configs.debug.state) {
        console.error(getFormattedDate() + ": " + txt);
    }
}

function getFormattedDate() {
    var dt = dateTime.create();
    return dt.format(configs.date.format);
}

module.exports = {
    Log,
    Error
}