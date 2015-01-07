var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId },
    player: {type: mongoose.Schema.ObjectId},
    value: {type: Number}
});

module.exports = mongoose.model('Rating', ratingSchema);