const config = require('../config.js');
const pool = require('./db.js');
const fs = require('fs');

module.exports.help = function(msg, args) {
    msg.reply('Command list:\n' +
    '**help:** Displays commands.\n' +
    '**say:** Makes the bot say the command args.\n' +
    '**nickname:** Changes the bot\'s nickname.'
    );
};

module.exports.say = function(msg, args) {
    let content = args.join(' ');
    msg.channel.send(content);
};

module.exports.nickname = function(msg, args, bot) {
    let newName = args.join(' ');
    msg.guild.members.get(bot.user.id).setNickname(newName).then(console.log(`changed name to \'${newName}\'.`));
};

module.exports.sql = function(msg, args) {
    let values = args[0] || '0';
    let pgcommand = args.splice(0, 1).join(' ');
    pool.query(pgcommand, (err, res) => {
        if (err) {
            console.error('QUERY ERROR:', err);
        }
        console.log(res);
    });
};