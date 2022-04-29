const mongoose = require('mongoose');
const autoPopulate = require('../../../utils/autopopulate')

const threadSchema = mongoose.Schema({

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
});

//recursive middleware for populating nested fields
threadSchema.pre('findOne', autoPopulate('author')).pre('find', autoPopulate('author'));

module.exports = mongoose.model('Thread', threadSchema);
