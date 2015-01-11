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
        res.sendStatus(200);
    });
};

exports.logout = function(req, res, next) {
    req.logout();
    res.sendStatus(200);
};

exports.list = function(req, res, next) {
    var query;
    if(req.query.all){
        query = User.find().select('-password').sort('name');
    }
    else{
        query = User.find({enabled:1}).select('-password').sort('name');
    }


    query.exec(function(err, users) {
        if (err) return next(err);
        res.send(users);
    });
};

exports.toggleEnabled = function(req, res, next) {

    User.update({_id: req.userid}, {
        "$bit": { "enabled": { "xor": 1 } }
    }, function(err) {
        if (err) return next(err);
        res.sendStatus(200);
    });
};



exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
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
                return res.sendStatus(403);
            }
        });
    };
};

exports.userByID = function(req, res, next, id) {
    req.userid = id ;
    next();
};