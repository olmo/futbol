var Rating = require('../models/rating');
var User = require('../models/user');

exports.list = function(req, res, next) {
    var query = Rating.find({ user: req.user.id });

    query.exec(function(err, ratings) {
        if (err) return next(err);
        res.send(ratings);
    });
};

exports.rate = function(req, res, next) {
    if(req.body.hasOwnProperty("_id")){
        Rating.update({_id: req.body._id}, {value: req.body.value}, function(err, element){
            if (err) return next(err);
            res.send(element);
        });
    }
    else{
        Rating.create({
            user: req.user.id,
            player: req.body.player,
            value: req.body.value
        }, function(err, element) {
            if (err) return next(err);
            res.send(element);
        });
    }
};

exports.average = function(req, res, next) {
    Rating.aggregate([
        { $group: {
            _id: '$player',
            rating: {$avg: '$value'}
        }}
    ], function(err, results){
        if(err) return next(err);

        User.populate(results, {path: '_id', select: 'name -_id'}, function (err2, result2) {
            if(err2) return next(err2);
            res.send(result2);
        });


    });
};

exports.listPopulated = function(req, res, next) {
    var query = Rating.find().select('-_id -__v').populate('user', 'name -_id').populate('player', 'name -_id');

    query.exec(function(err, ratings) {
        if (err) return next(err);
        res.send(ratings);
    });
};