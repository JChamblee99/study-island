const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({

    threadAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    threadTitle: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

module.exports = mongoose.model('Thread', threadSchema);
