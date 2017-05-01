var sender = require('../utilities/pagesender');

module.exports = function(app, config) {

    function send404(req, res) {
        sender.send(res, {
            path: config.rootPath + '/server/404.html',
            status: 404
        });
    }

    app.get('/about', function(req, res) {
        res.redirect('/#about');
    });
    app.get('/projects', function(req, res) {
        res.redirect('/#projects');
    });
    app.get('/portfolio', function(req, res) {
        res.redirect('/#projects');
    });
    app.get('/blog', function(req, res) {
        res.redirect('/#blog');
    });
    app.get('/contact', function(req, res) {
        res.redirect('/#contact');
    });

    app.get('/resources/*', send404);
    app.get('/games/*', send404);

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};