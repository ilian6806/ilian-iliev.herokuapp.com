var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

module.exports = function(app, config) {
    app.use(favicon(path.join(__dirname, '../../public/images', 'favicon.ico')));
    app.use(bodyParser());
    app.use(express.static(config.rootPath + '/public'));
};