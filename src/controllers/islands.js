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

    getAllIslands: async function (req, res) {
        const islands = await Island.find().lean();
        res.render('islandList', { islands });
        console.log({ islands });
    },

    getSingleIsland: async function (req, res) {
        const island = await Island.findById({ _id: req.params.islandId }).lean();
        if (island) {
            res.render('island', { island });
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
        res.render('/add-island');
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
        const island = Island.find(req.params.islandId).lean();
        const threads = island.threads;
        res.json({
            data2: threads,
        });
        console.log("FIX ME -- UNABLE TO RETURN THREADS");
    },

    addThread: async function (req, res) {
        if (req.params.islandId && req.params.userId) {
            Island.find(req.params.islandId).$push({ users: req.params.userId },
                function (err) {
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

    deleteThreadById: async function (req, res) {
        if (req.params.islandId && req.params.threadId) {
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

}