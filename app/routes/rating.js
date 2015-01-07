var rating = require('../controllers/rating');
var users = require('../controllers/users');

module.exports = function(app) {
    app.route('/api/rating')
        .post(users.requiresLogin, rating.rate);

    app.route('/api/rating')
        .get(users.requiresLogin, rating.list);

    //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
    //app.param('id', shows.articleByID);
};