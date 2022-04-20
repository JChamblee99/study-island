const mongoose = require('mongoose');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');

const Island = mongoose.model("Island");

module.exports = {

    Search: async function (req, res) {
        if (req.query.searchTerm && req.query.searchTerm.trim() != '') {

            const results = await Island.find( {
                $or: [ 
                    { 'name': {$regex: req.query.searchTerm } }, 
                    { 'description': { $regex: req.query.searchTerm } } 
                ] 
            }).lean();


            if (results) {
                res.render('searchResults', {results})
            } else {
                res.render('home')
            }
        } else {
            res.json ({
                status: "error",
                message: {
                    q: "No search term provided"
                }
            })
            res.render('home');
        }
    }

}