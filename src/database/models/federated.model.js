const mongoose = require('mongoose');

const federatedSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: String,
    accessToken: String,
    subject: String

});

module.exports = mongoose.model('Federated', federatedSchema);
