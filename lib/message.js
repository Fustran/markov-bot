const cmd = require('./commands.js');
let topic = [];

module.exports.commandHandler = function(msg, bot) {
    let args = msg.content.substring(1, msg.content.length).split(' ');
    let command = args[0];
    args.splice(0, 1);

    switch(command) {
        case 'help':
            cmd.help(msg, args);
            break;

        case 'say':
            cmd.say(msg, args);
            break;

        case 'nick':    
        case 'nickname':
            cmd.nickname(msg, args, bot);
            break;
            
        case 'sql':
            cmd.sql(msg, args);
            break;

        default:
            msg.reply('Unknown command.');
    }
};

module.exports.messageHandler = function(msg) {
    let content = filter(msg);
    
};

filter = function(msg) {
    //if there is a multi-line code block, we don't want the message
    if (msg.content.match(/\`\`\`/g)) {
        return [];
    }
    //clear out any one line code blocks
    let message = msg.content.replace(/`[\w\d\s\!\@\#\$\%\^\&\*\9\)\<\>,.\[\]\?\"\-\=]+`/g, ' ');
    //remove extra spaces
    message = message.replace(/ +(?= )/g, '');
    //split by words
    message = message.split(' ');
    //remove links
    message = message.filter((word) => !word.match(/(^(!|`{1,3}))|(^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$)/g));
    //remove words that are only symbols
    message = message.filter((word) => !word.match(/^[\!\@\#\$\%\^\&\.\?\'\-\"\*\(\)0-9]+$/g));
    return message;
};