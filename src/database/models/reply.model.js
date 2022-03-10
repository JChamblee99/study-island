const mongoose = require('mongoose');

const replySchema = mongoose.Schema({

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        trim: true
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]

});

module.exports = mongoose.model('Reply', replySchema);
