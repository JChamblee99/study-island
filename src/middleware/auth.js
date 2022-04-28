require('../database/models/island.model');
require('../database/models/user.model');

const mongoose = require('mongoose');
const Island = mongoose.model("Island");

module.exports = {

    isLoggedIn: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    },

    isIslandModerator: async (req, res, next) => {
        const island = await Island.findById(req.params.islandId);

        if (island.mods.includes(req.user._id)) {
            next();
        } else {
            res.status(403);
            res.json({
                status: "error",
                data: "Permission denied"
            });
        }
    },

    isIslandUser: async (req, res, next) => {
        const island = await Island.findById(req.params.islandId);

        if (island.users.includes(req.user._id)) {
            next();
        } else {
            res.status(403);
            res.json({
                status: "error",
                data: "Permission denied"
            });
        }
    },

    isAuthor: async (req, res, next) => {
        let post = await Reply.findById(req.params.replyId) || await Thread.findById(req.params.threadId);

        if (post.author._id.equals(req.user._id)) {
            next();
        } else {
            res.status(403);
            res.json({
                status: "error",
                data: "Permission denied"
            });
        }
    },

    isAuthorOrModerator: async (req, res, next) => {
        let post = await Reply.findById(req.params.replyId) || await Thread.findById(req.params.threadId);
        let island = await Island.findById(req.params.islandId);

        if (post.author._id.equals(req.user._id) || island.mods.includes(req.user._id)) {
            next();
        } else {
            res.status(403);
            res.json({
                status: "error",
                data: "Permission denied"
            });
        }
    },

    isIslandPublic: async (req, res, next) => {
        let island = await Island.findById(req.params.islandId);

        if(island.privacy.equals("public")) {
            next();
        } else {
            res.status(403);
            res.json({
                status: "error",
                data: "Permission denied"
            });
        }
    },
};

