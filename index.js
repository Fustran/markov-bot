const discord = require('discord.js');
const config = require('./config.js');
const bot = new discord.Client();
require('./lib/listeners.js')(bot);

bot.login(config.token);