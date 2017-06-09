const cmd = require('./commands.js');
let topic = [];

//handles calling commands
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

//handles feeding sentences to the markov model for learning.
module.exports.messageHandler = function(msg) {
    let content = filter(msg);
    //construct a new entry for the markov model
    let entry = [];
    if (content.length == 2) {
        entry = [content[0] + ' ' + content[1]];
    } else {
        for (i=0; i < content.length; i++) {
            let secondWord =  content[i+1] || '';
            let wordConstruct = content[i] + ' ' + secondWord;
            //get our next word
            let nextWord = content[i+2] || '';
            if (nextWord != '') {
                entry.push([wordConstruct, nextWord]);
            }
        }
    }
    console.log(entry);

};

//function to filter the garbage out of messages before we add it to our markov model
filter = function(msg) {
    //remove multi-line code blocks
    let message = msg.content.replace(/(```)[\s\n\w\!\@\#\$\%\^\-\(\)\[\]\{\}\+&.,?'"*;:=]+\1/g, ' ');
    //clear out any one line code blocks
    message = message.replace(/`[\s\n\w\!\@\#\$\%\^\-\(\)\[\]\{\}\+&.,?'"*;:=]+`/g, ' ');
    //remove extra spaces, then newlines, whitespace, etc.
    message = message.replace(/ +(?= )/g, '');
    message = message.replace(/[\t\r\n]/g, '');
    //split by words
    message = message.split(' ');
    //remove links
    message = message.filter((word) => !word.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig));
    //remove words that are only symbols
    message = message.filter((word) => !word.match(/^[\!\@\#\$\%\^\&\.\?\'\-\"\*\(\)\+]+$/g));
    return message;
};