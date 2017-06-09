const fs = require('fs');

var settings;
if (fs.existsSync('settings.json') && fs.readFileSync('settings.json', 'utf8').length > 0) {
    settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
} else {
    let defaultSettings = {'speak': true};
    settings = JSON.stringify(defaultSettings, null, 4);
    fs.writeFile('settings.json', settings, (err) => {
        if (err) return console.warn(err);
    });
}

exports.cfg = {
    token: process.env.MARKOV_BOT_TOKEN,
    commandChar: process.env.MARKOV_COMMAND_CHAR || '?',
    pgHost: process.env.MARKOV_PGHOST || 'localhost',
    pgName: process.env.MARKOV_PGNAME || 'postgres',
    pgUser: process.env.MARKOV_PGUSER || 'postgres',
    pgPass: process.env.MARKOV_PGPASS || 'password',
    pgPort: process.env.MARKOV_PGPORT || '5432'   
};