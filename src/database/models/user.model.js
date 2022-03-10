const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

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
    password: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    }

});

module.exports = mongoose.model('User', userSchema);
