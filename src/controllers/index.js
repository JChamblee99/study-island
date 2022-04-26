const mongoose = require('mongoose');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');

const Island = mongoose.model("Island");

module.exports = {

    Search: async function (req, res) {
        if (req.query.searchTerm && req.query.searchTerm.trim() != '') {
            const results = await Island.find({
                $or: [
                    { 'name': { $regex: req.query.searchTerm } },
                    { 'description': { $regex: req.query.searchTerm } }
                ]
            }).lean();

            if (results != '') {
                res.render('searchResults', { results });
            } else {
                const noResults = "No results were found for '" + req.query.searchTerm + "'";
                return res.render('searchResults', { noResults });
            }

        } else {
            const error = "No search term was provided";
            return res.render('searchResults', { error });
        }
    }

}