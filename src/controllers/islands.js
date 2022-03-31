const mongoose = require('mongoose');

const Island = require("../database/models/island.model");



module.exports = {

    getAllIslands: async function(req, res) {
        Island.find()
        .then(function (allIslands) {
            res.json = ({
                status: "success",
                data: {
                    island: allIslands,
                },
            });
        });
    },

    getSingleIsland: async function (req, res) {
        if(req.params.id) {
            Island.find({_id: req.params.id}).then(function(res) {
                if(res && res.length > 0) {
                    res.json({
                        status: "success",
                        data: {
                            island: res[0],
                        },
                    });
                }else {
                    res.json({
                        status: "fail",
                        data: {id: "The specified id was not found"},
                    });
                }
            });
        }else {
            res.json({
                status: "fail",
                data: {id: "An id is required but was not passed in. "},
            });
        }
    },

    addIsland: async function (req, res) {
        if(
            req.body &&
            req.body.name &&
            req.body.description &&
            req.body.privacy
        ) {
            try {
                await Island.create(req.body);
                res.status(201);
                res.json({
                    statys: "sucess",
                    data: {},
                });
            } catch(err) {
                res.json({
                    status: "error",
                    data: err.message,
                });
            }
        }else {
            res.json({
                status: "fail",
                data: "All fields were not provided. Can not create Island",
            });
        }
    },

    editIsland: async function (req, res) {
        if(req.params.id && req.body) {
            try {
                await Island.findByIdAndUpdate({_id: req.params.id}, req.body).lean();
                res.status(201);
                res.json({
                    status: "success",
                    data: {},
                });
            } catch(err) {
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
        if(req.params.id) {
            await Island.findByIdAndDelete({_id: req.params.id}).lean();

            res.json({
                status: "success",
                data: {},
            });
        } else {
            //Send back and error
            res.json({
                status: "fail",
                data: {id: "An id is required but was not passed in" },
            });
        }
    },

    addUserById: async function (req, res) {
        console.log("Fix to add user to island");
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