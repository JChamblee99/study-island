const mongoose = require('mongoose');

require('../database/models/island.model');
require('../database/models/thread.model');
require('../database/models/reply.model');
require('../database/models/user.model');



const Island = mongoose.model("Island");
const User = mongoose.model("User");
const Thread = mongoose.model("Thread");
const Reply = mongoose.model("Reply");

const { dbConnect, dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');

module.exports = {

    getAllIslands: async function (req, res) {
        Island.find().then(function (allIslands) {
            res.json({
                status: "success",
                data: { islands: allIslands },
            });

        });
    },

    getSingleIsland: async function (req, res) {
        var id = req.params.id;
        if (id) {
            Island.find({ _id: id }).then(function(results) {
                    if (results && results.length > 0) {
                        res.json({
                            status: "success",
                            data: {
                                island: results[0],
                            },
                        });
                    } else {
                        res.json({
                            status: "fail",
                            data: { id: "The specified id was not found" },
                        });
                    }
                });
        } else {
            res.json({
                status: "fail",
                data: { id: "An id is required but was not passed in. " },
            });
        }
    },

    addIsland: function (req, res) {
        var newIsland = req.body;
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
        if(req.params.islandId && req.params.userId) {
            Island.findByIdAndUpdate(req.params.islandId, {users: req.params.userId},
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            status: "success",
                            data: {user: "User added"}
                        });
                    }
                });
        }
    },

    deleteUserById: async function (req, res) {
        console.log("Fix to delete user by id");
    },

    addThread: async function (req, res) {
        console.log("Fix to add thread to island");
    },

    editThread: async function (req, res) {
        console.log("Fix to edit thread on island");
    }


}