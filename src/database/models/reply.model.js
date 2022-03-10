const mongoose = require('mongoose');

const replySchema = mongoose.Schema({

    replyId: {
        type: Number,
        unique: true
    },
    replyAuthor: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('Reply', replySchema);