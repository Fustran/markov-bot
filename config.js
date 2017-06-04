const fs = require('fs');

var settings;
if (fs.existsSync('settings.json')) {
    settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
} else {
    let defaultSettings = {'nickname': 'Markov-bot', 'speak': true};
    settings = JSON.stringify(defaultSettings, null, 4);
    fs.writeFile('settings.json', settings, (err) => {
        if (err) return console.warn(err);
    });
}

let config = {
    token: process.env.MARKOV_BOT_TOKEN,
    name:  settings.nickname || 'Markov-bot',
    commandChar: process.env.MARKOV_COMMAND_CHAR || '?',
    pgName: process.env.MARKOV_PGNAME,
    pgUser: process.env.MARKOV_PGUSER,
    pgPass: process.env.MARKOV_PGPASS,
    pgPort: process.env.MARKOV_PGPORT
};

module.exports = config;