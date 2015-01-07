var rating = require('../controllers/rating');
var users = require('../controllers/users');

module.exports = function(app) {
    app.route('/api/rating')
        .post(users.requiresLogin, rating.rate)
        .get(users.requiresLogin, rating.list);

    app.route('/api/rating/average')
        .get(rating.average);

    app.route('/api/rating/listPopulated')
        .get(rating.listPopulated);

    //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
    //app.param('id', shows.articleByID);
};