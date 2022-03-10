const mongoose = require('mongoose');

const replySchema = mongoose.Schema({

    replyAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('Reply', replySchema);
