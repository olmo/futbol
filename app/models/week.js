var mongoose = require('mongoose');

var weekSchema = new mongoose.Schema({
    date: { type: Date },
    players: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    substitutes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    team1: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    team2: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Week', weekSchema);