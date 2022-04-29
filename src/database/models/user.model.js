const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({

    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    },
    active: {
        type: String,
        enum: ['inactive', 'active'],
        default: 'inactive'
    },
    islands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Island' }]

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
