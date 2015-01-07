var users = require('../controllers/users');
var passport = require('passport');

module.exports = function(app) {
    // Article Routes
    app.route('/api/users/login')
        .post(passport.authenticate('local'), users.login);

    app.route('/api/users/logout')
        .get(users.logout);

    app.route('/api/users/signup')
        .post(users.signup);

    app.route('/api/users')
        .get(users.list);
    //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
    //app.param('id', shows.articleByID);
};