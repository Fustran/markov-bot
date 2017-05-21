const cmd = require('./commands.js');

exports.commandHandler = function(msg) {
    var args = msg.content.substring(1, msg.content.length).split(' ');
    var command = args[0];
    args.splice(0);

    switch(command) {
        case 'h':
        case 'help':
            cmd.help(msg, args);
            break;
            
        default:
            msg.reply('Unknown command.');
    }
};

exports.messageHandler = function(msg) {
    console.log('message');
};