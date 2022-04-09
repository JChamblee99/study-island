const mongoose = require('mongoose');

const islandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    description: String,
    privacy: {
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    mods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }]

});

module.exports = mongoose.model('Island', islandSchema);
