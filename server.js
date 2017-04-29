
require('./server/utilities/logger');

var express = require('express');
var env = (process.env.NODE_ENV) ? 'live' : 'dev';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/routes')(app, config);

// start the server
var server = app.listen(config.port);

// and prepare for the worst..
process.on('uncaughtException', function (err) {
    log(err);
    log("Node restarting...");
    server.close();
    server = app.listen(config.port);
    log(`Server running on port ${config.port}...`);
});

log(`Server running on port ${config.port}...`);