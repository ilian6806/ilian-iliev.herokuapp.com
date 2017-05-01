var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app, config) {
    app.use(bodyParser());
    app.use(express.static(config.rootPath + '/public'));
};