const mongoose = require('mongoose');

const islandSchema = mongoose.Schema({
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
<<<<<<< HEAD
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }]
=======
    users: [userSchema],
    threads: []
>>>>>>> 6a2379dec1564ad5e04c009196fe6bc586d69898

});

module.exports = mongoose.model('Island', islandSchema);
