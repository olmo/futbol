var week = require('../controllers/week');
var users = require('../controllers/users');

module.exports = function(app) {
    app.route('/api/week')
        .post(users.requiresLogin, users.hasAuthorization(['admin']), week.create)
        .get(week.list)
        .delete(users.requiresLogin, users.hasAuthorization(['admin']), week.delete)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), week.update);

    app.route('/api/week/getNext').get(week.getNext);

    app.route('/api/week/:id')
        .get(week.read);


};