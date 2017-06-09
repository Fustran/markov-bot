const message = require('./msgHandler.js');
const config = require('../config.js');

module.exports = function(bot) {

    bot.on ('ready', () => {
        console.log(`${bot.user.username} ready.`);
    });

    bot.on('disconnect', () => {
        console.log(`${bot.user.username} disconnected.`);
    });

    bot.on('reconnecting', () => {
        console.log(`${bot.user.username} reconnecting...`);
    });

    bot.on('message', (msg) => {
        if (msg.content.substring(0,1) === config.cfg.commandChar && msg.content.length > 1) {
            message.commandHandler(msg, bot);
        } else if (msg.author.username !== bot.user.username) {
            message.messageHandler(msg);
        }
    });
};