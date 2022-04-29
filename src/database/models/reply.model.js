const mongoose = require('mongoose');
const autoPopulate = require('../../../utils/autopopulate');

let replySchema = mongoose.Schema({

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {
        type: String,
        trim: true
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}]

});

replySchema.pre('findOne', autoPopulate('author')).pre('find', autoPopulate('author')).pre('findOne', autoPopulate('replies')).pre('find', autoPopulate('replies'));

module.exports = mongoose.model('Reply', replySchema);
