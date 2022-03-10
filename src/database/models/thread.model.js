const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({

    threadId: {
        type: Number,
        unique: true
    },
    threadAuthor: {
        type: String,
        trim: true
    },
    threadTitle: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    replies: []
});

module.exports = mongoose.model('Thread', threadSchema);