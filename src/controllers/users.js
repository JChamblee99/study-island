const mongoose = require('mongoose');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');

const Island = mongoose.model("Island");
const User = mongoose.model("User");
const Thread = mongoose.model("Thread");
const Reply = mongoose.model("Reply");

module.exports = {

    getAllUsers: async function (req, res) {
        User.find().then(function (allUsers) {
            res.json({
                status: "success",
                data: { users: allUsers },
            });

        });
    },

    getUser: async (req, res) => {
        let user = User.findById(req.params.userId).populate("islands").exec(
            (err, user) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        res.render('user', {
            user: user
        })

    }

}