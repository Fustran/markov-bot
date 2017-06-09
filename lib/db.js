const pg = require('pg');
const config = require('./../config.js');

let pgconfig = {
    user: config.cfg.pgUser,
    database: config.cfg.pgName,
    password: config.cfg.pgPass,
    port: config.cfg.pgPort,
    host: 'localhost',
    max: 10, // max clients
    idleTimeoutMillis: 30000, //idle time
};

const pool = new pg.Pool(pgconfig);

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

module.exports.query = function(text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

module.exports.connect = function(callback) {
    return pool.connect(callback);
};