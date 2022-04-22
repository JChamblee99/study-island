const mongoose = require('mongoose');
const app = require('../app');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');



const Island = mongoose.model("Island");
const User = mongoose.model("User");
const Thread = mongoose.model("Thread");
const Reply = mongoose.model("Reply");

module.exports = {

    getAllIslands: async function (req, res) {
        const islands = await Island.find().lean();
        res.render('allIslands', { islands });
        console.log({ islands });
    },

    getSingleIsland: async function (req, res) {
        const island = await Island.findById({ _id: req.params.islandId }).populate('threads').lean();
        if (island) {
            res.render('island', island );
            console.log({ island });
        }
        else {
            res.json({
                status: "error",
                data: "No Island with that id was found"
            });
        }
    },

    addIslandForm: function (req, res) {
        res.render('makeIsland');
    },

    addIsland: function (req, res) {
        const newIsland = req.body;
        try {
            Island.create(req.body);
            res.status(201);
            res.json({
                status: "sucess",
                data: { newIsland },
            });
        } catch (err) {
            res.json({
                status: "error",
                data: err.message,
            });
        }
    },

    editIsland: async function (req, res) {
        if (req.params.id && req.body) {
            var updatedIsland = req.body;
            try {
                await Island.findByIdAndUpdate({ _id: req.params.id }, req.body).lean();
                res.status(201);
                res.json({
                    status: "success",
                    data: { updatedIsland },
                });
            } catch (err) {
                res.json({
                    status: "error",
                    data: err.message,
                });
            }
        } else {
            res.json({
                status: "fail",
                data: "All fields were not provided. Can not upate this island",
            });
        }
    },

    deleteIslandById: async function (req, res) {
        if (req.params.id) {
            await Island.findByIdAndDelete({ _id: req.params.id }).lean();
            res.json({
                status: "success",
                data: {},
            });
        } else {
            res.json({
                status: "fail",
                data: { id: "An id is required but was not passed in" },
            });
        }
    },

    addUserById: async function (req, res) {
        if (req.params.islandId && req.params.userId) {
            Island.findByIdAndUpdate(req.params.islandId, { $push: { users: req.params.userId } },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            status: "success",
                            data: { user: "User added" }
                        });
                    }
                });
        }
    },

    deleteUserById: async function (req, res) {
        if (req.params.islandId && req.params.userId) {
            Island.findByIdAndUpdate(req.params.islandId, { $pull: { users: req.params.userId } },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            status: "success",
                            data: { user: "User removed" }
                        });
                    }
                });
        }
    },

    getAllThreads: async function (req, res) {
        const island = Island.findById(req.params.islandId).populate('threads');
        const threads = island.threads;
        res.json({
            data2: threads,
        });
        console.log(threads);
    },

    addThread: async function (req, res) {
        
        const data = {author: req.user._id, title: req.body.title, content: req.body.content, replies: []}
        const thread = await Thread.create(data);
        console.log(thread)
        
        if (req.params.islandId && req.user) {
            Island.findByIdAndUpdate(req.params.islandId, { $push: { threads: thread._id } },
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.redirect('./');
                    }
                });
        }
    },

    deleteThreadById: async function (req, res) {
        if (req.params.islandId && req.params.threadId) {
            Island.findByIdAndUpdate(req.params.islandId, { $pull: { threads: req.params.threadId } },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            status: "success",
                            data: { user: "Thread removed" }
                        });
                    }
                });
        }
    },

    showCreateThread: (req, res) => {
        res.render('createThread', { islandID: req.params.islandId });
    }

}