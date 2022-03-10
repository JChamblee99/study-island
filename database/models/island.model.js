const mongoose = require('mongoose');

const islandSchema = mongoose.Schema({
    islandId: {
        type: Number,
        unique: true
    },
    islandName: {
        type: String,
        trim: true,
        unique: true
    },
    description: String,
    privacy: {
        type: 'String',
        enum: ['private', 'public'],
        default: 'public'
    },
    users: [userSchema],
    threads: []

});

module.exports = mongoose.model('Island', islandSchema);