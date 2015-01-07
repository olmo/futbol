var Rating = require('../models/rating');

exports.list = function(req, res, next) {
    var query = Rating.find({ user: req.user.id });

    query.exec(function(err, ratings) {
        if (err) return next(err);
        res.send(ratings);
    });
};

exports.rate = function(req, res, next) {
    if(req.body.hasOwnProperty("_id")){
        Rating.update({_id: req.body._id}, {value: req.body.value}, function(err){
            if (err) return next(err);
            res.send(200);
        });
    }
    else{
        Rating.create({
            user: req.user.id,
            player: req.body.player,
            value: req.body.value
        }, function(err) {
            if (err) return next(err);
            res.send(200);
        });
    }
};