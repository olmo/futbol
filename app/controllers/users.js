var User = require('../models/user');
var _ = require('lodash');

exports.login = function(req, res){
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
};

exports.signup = function(req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    });
    user.save(function(err) {
        if (err) return next(err);
        res.send(200);
    });
};

exports.logout = function(req, res, next) {
    req.logout();
    res.send(200);
};

exports.list = function(req, res, next) {
    var query = User.find().sort('name');

    query.exec(function(err, users) {
        if (err) return next(err);
        res.send(users);
    });
};



exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};

exports.hasAuthorization = function(roles) {
    var _this = this;

    return function(req, res, next) {
        _this.requiresLogin(req, res, function() {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};