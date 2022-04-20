const mongoose = require('mongoose');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');

const Island = mongoose.model("Island");

module.exports = {

    Search: async function (req, res) {
        if (req.query.q && req.query.q.trim() != '') {

            const nameResults = await Island.find({
                name: { $regex: req.query.q },
            }).lean();
            const descResults = await Island.find({
                description: { $regex: req.query.q },
            }).lean();


            if (nameResults || descResults) {

                res.json({
                    status: "success",
                    names: { nameResults },
                    desc: { descResults }
                });
            } else {
                islandResults = { data: "No Islands Were Found" };
                res.json({
                    status: "fail",
                    data: { islandResults }
                });
            }
        } else {
            res.json ({
                status: "error",
                message: {
                    q: "No search term provided"
                }
            })
        }
    }

}