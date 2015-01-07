var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    player: {type: mongoose.Schema.ObjectId, ref: 'User'},
    value: {type: Number}
});

module.exports = mongoose.model('Rating', ratingSchema);