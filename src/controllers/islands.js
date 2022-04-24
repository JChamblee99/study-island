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
        if (req.params.islandId && req.body) {
            var updatedIsland = req.body;
            try {
                const island = await Island.findById(req.params.islandId);
                if (island.mods.includes(req.user._id)) {
                    await Island.findByIdAndUpdate({ _id: req.params.islandId }, req.body).lean();
                    res.status(201);
                    res.json({
                        status: "success",
                        data: { updatedIsland },
                    });
                } else {
                    res.status(403);
                    res.json({
                        status: "error",
                        data: "Permission denied"
                    });
                }
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
        if (req.params.islandId) {
            const island = await Island.findById(req.params.islandId);
            if (island.mods.includes(req.user._id)) {
                await Island.findByIdAndDelete({ _id: req.params.islandId }).lean();
                res.json({
                    status: "success",
                    data: {},
                });
            } else {
                res.status(403);
                    res.json({
                    status: "error",
                    data: "Permission denied"
                });
            }
        } else {
            res.json({
                status: "fail",
                data: { id: "An id is required but was not passed in" },
            });
        }
    },

    addUserById: async function (req, res) {
        if (req.params.islandId && req.params.userId) {
            const island = await Island.findById(req.params.islandId);
            if (island.mods.includes(req.user._id)) {
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
                    }
                );
            } else {
                res.status(403);
                    res.json({
                    status: "error",
                    data: "Permission denied"
                });
            }
        }
    },

    deleteUserById: async function (req, res) {
        if (req.params.islandId && req.params.userId) {
            const island = await Island.findById(req.params.islandId);
            if (island.mods.includes(req.user._id)) {
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
                    }
                );
            } else {
                res.status(403);
                    res.json({
                    status: "error",
                    data: "Permission denied"
                });
            }
        }
    },

    getAllThreads: async function (req, res) {
        Island.findById(req.params.islandId).exec(
            function (err, island) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        data: island.threads
                    });
                }
            }
        );
    },

    getSingleThread: async function (req, res) {
        Thread.findById(req.params.threadId).populate("replies").exec(
            function (err, thread) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        data: thread
                    });
                }
            }
        );
    },

    addThread: async function (req, res) {
        const data = { author: req.user._id, title: req.body.title, content: req.body.content };
        const thread = await Thread.create(data);
        console.log(thread);

        if (req.params.islandId) {
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
            let island = await Island.findById(req.params.islandId);
            let thread = await Thread.findById(req.params.threadId);

            let exists = island && thread;
            let containsThread = island.threads.includes(thread._id);
            let hasPermission = (thread.author._id.equals(req.user._id) || island.mods.includes(req.user._id));

            if (exists && containsThread && hasPermission) {
                island.threads.pull(thread);
                island.save();
                thread.remove();
                res.json({
                    status: "success"
                });
            } else {
                res.json({
                    status: "fail"
                });
            }
        }
    },

    addReply: async function (req, res) {
        const data = {author: req.user._id, content: req.body.content, replies: []}
        const reply = await Reply.create(data);
        console.log(reply)
        
        if (req.params.threadId) {
            Thread.findByIdAndUpdate(req.params.threadId, { $push: { replies: reply._id } },
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

    deleteReplyById: async function (req, res) {
        if (req.params.islandId && req.params.threadId) {
            let island = await Island.findById(req.params.islandId);
            let parent = await Thread.findById(req.params.threadId)
            let reply = await Reply.findById(req.params.replyId);

            let exists = island && reply;
            let hasPermission = (reply.author._id.equals(req.user._id) || island.mods.includes(req.user._id));

            if (exists && hasPermission) {
                reply.remove();
                res.json({
                    status: "success"
                });
            } else {
                res.json({
                    status: "fail"
                });
            }
        }
    },

    getSingleReply: async function (req, res) {
        Reply.findById(req.params.replyId).populate("replies").exec(
            function (err, reply) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        data: reply
                    });
                }
            }
        );
    },

    showCreateThread: (req, res) => {
        res.render('createThread', { islandID: req.params.islandId });
    }

}

