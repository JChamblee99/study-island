const mongoose = require('mongoose');

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

// threadSchema.pre('find', function (next) {
//     if (this.options._recursed) {
//         return next();
//     }
//     this.populate({path: "author", select: "username", options: {_recursed: true}});
//     this.populate({path: "replies", select: "author content replies", options: {_recursed: true}});
//     next();
// });

// threadSchema.pre('findOne', function (next) {
//     if (this.options._recursed) {
//         return next();
//     }
//     this.populate({path: "author", select: "username", options: {_recursed: true}});
//     this.populate({path: "replies", select: "author content replies", options: {_recursed: true}});
//     next();
// });

module.exports = mongoose.model('Thread', threadSchema);
