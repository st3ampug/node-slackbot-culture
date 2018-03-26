var customMessage = {
    "type":"message",
    "channel":"C9UEXJFUM",
    "user":"U1Z3TR58T",
    "text":"hey <@U9R87EK45>",
    "ts":"1521734781.000250",
    "source_team":"T0316ELAC",
    "team":"T0316ELAC"
};

var re = new RegExp('<@.*>');

console.log(re.test(customMessage.text));