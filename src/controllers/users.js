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

            let user = await User.findById(req.params.userId).populate("islands").lean();
            console.log(user);
            res.render('user', {
                user: user
            });

    },

    getCurrentUser: async (req, res) => {

        let user = await User.findById(req.user._id).populate("islands").lean();
        console.log(user);
        res.render('user', {
            user: user
        });

}
}