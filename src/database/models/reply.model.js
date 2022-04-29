const mongoose = require('mongoose');

const replySchema = mongoose.Schema({

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        trim: true
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]

});

replySchema.pre('find', function (next) {
    if (this.options._recursed) {
        return next();
    }
    this.populate({path: "author", select: "username" ,options: {_recursed: true}});
    this.populate({path: "replies", select: "author content replies", options: {_recursed: true}});
    next();
});

replySchema.pre('findOne', function (next) {
    if (this.options._recursed) {
        return next();
    }
    this.populate({path: "author", select: "username" ,options: {_recursed: true}});
    this.populate({path: "replies", select: "author content replies", options: {_recursed: true}});
    next();
});

module.exports = mongoose.model('Reply', replySchema);
