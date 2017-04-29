var fs = require('fs');
var resolvedOptions = require('../utilities/base').Options;

module.exports = {

    send: function (res, options) {

        // merge options with defaults
        var opt = new resolvedOptions(options, {
            path: '',
            type: 'text/html',
            status: 200
        });

        fs.readFile(opt.path, 'utf8', function (err, data) {
            if (err) throw err;
            res.type(opt.type);
            res.status(opt.status).send(data);
        });
    }
};