const mongoose = require('mongoose');

const Player = mongoose.model('Player', new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    position: {
        type: String,
        maxlength: 50
    },
    number: {
        type: Number,
        maxlength: 50
    },
    username: {
        type: String,
        maxlength: 50
    }
}));

exports.Player = Player; 