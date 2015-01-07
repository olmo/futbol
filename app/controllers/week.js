var Week = require('../models/week');
var Rating = require('../models/rating');

exports.list = function(req, res, next) {
    var query = Week.find();

    query.exec(function(err, weeks) {
        if (err) return next(err);
        res.send(weeks);
    });
};

exports.create = function(req, res, next) {
    createTeams(req.body.players, function(teams){
        Week.create({
            date: req.body.date,
            players: req.body.players,
            substitutes: req.body.substitutes,
            team1: teams.team1,
            team2: teams.team2
        }, function(err) {
            if (err) return next(err);
            res.send(200);
        });
    });
};

exports.update = function(req, res, next) {
    createTeams(req.body.players, function(teams){
        Week.update({_id: req.body._id}, {
            date: req.body.date,
            players: req.body.players,
            substitutes: req.body.substitutes,
            team1: teams.team1,
            team2: teams.team2
        }, function(err) {
            if (err) return next(err);
            res.send(200);
        });
    });
};

exports.delete = function(req, res, next) {
    Week.remove({_id: req.query.id}, function(err) {
        if (err) return next(err);
        res.send(200);
    });
};

exports.read = function(req, res, next){
    Week.findById(req.params.id).populate('players').populate('substitutes').populate('team1').populate('team2').exec(function(err, week) {
        if (err) return next(err);
        if (!week) return next(new Error('Failed to load Week ' + req.params.id));
        res.send(week);
    });
};

exports.getNext = function(req, res, next){
    Week.findOne({'date':{ $gt: new Date()}}).sort('date').populate('players').populate('substitutes').populate('team1').populate('team2').exec(function(err, week) {
        if (err) return next(err);
        if (!week) return next(new Error('Failed to load Week '));
        res.send(week);
    });
};

function createTeams(players, callback){

    Rating.aggregate([
        { $group: {
            _id: '$player',
            rating: {$avg: '$value'}
        }}
        ], function(err, results){
            if (err) {
                console.error(err);
            } else {

                var i,j;
                var players_ratings = [];

                for(i=0; i<players.length; i++){
                    for(j=0; j<results.length; j++){
                        if(players[i] == results[j]._id){
                            players_ratings.push(results[j]);
                        }
                    }
                }

                players_ratings = shuffle(players_ratings);

                var teams = {};
                teams.team1 = [];
                teams.team2 = [];

                var totalSum = 0;


                for(i=0; i<players_ratings.length; i++){
                    totalSum += players_ratings[i].rating;

                    if(i<players_ratings.length/2){
                        teams.team1.push(players_ratings[i]);
                    } else {
                        teams.team2.push(players_ratings[i]);
                    }
                }

                var goal = totalSum / 2.0;
                var swapped;

                do{
                    swapped = false;

                    for(j=0; j<players_ratings.length/2; j++){
                        var curSum = sum(teams.team1);
                        var curBestDiff = Math.abs(goal - curSum);
                        var curBestIndex = -1;

                        for(i=0; i<players_ratings.length/2; i++){
                            var testSum = curSum - teams.team1[j].rating + teams.team2[i].rating;
                            var diff = Math.abs(goal - testSum);
                            if(diff < curBestDiff){
                                curBestDiff = diff;
                                curBestIndex = i;
                            }
                        }

                        if(curBestIndex >= 0){
                            swapped = true;
                            console.log('swapping '+teams.team1[j]+' y '+teams.team2[curBestIndex]);
                            var tmp = teams.team1[j];
                            teams.team1[j] = teams.team2[curBestIndex];
                            teams.team2[curBestIndex] = tmp;
                        }
                    }

                }while(swapped);

                var teams_final = {};
                teams_final.team1 = [];
                teams_final.team2 = [];

                console.log(sum(teams.team1));
                console.log(sum(teams.team2));

                for(i=0; i<teams.team1.length; i++){
                    teams_final.team1.push(teams.team1._id);
                }
                for(i=0; i<teams.team2.length; i++){
                    teams_final.team2.push(teams.team2._id);
                }

                callback(teams);
            }
        }
    );



}

function sum(list){
    var sum = 0;
    for(var i=0; i<list.length; i++){
        sum += list[i].rating;
    }

    return sum;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};