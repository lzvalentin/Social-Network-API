const { response } = require("express");
const res = require("express/lib/response");
const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    // get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({
            _id: params.thoughtId
        }).then((thoughtData) => {
            if (!thoughtData) {
                return res.status(404).json({
                    message: "No thought related to this ID"
                });
            }
            res.json(thoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    {
                        _id: body.userId
                    },
                    {
                        $push: { thoughts: thoughtData._id }
                    }, {
                    new: true
                });
            }).then((userData) => {
                if (!userData) {
                    res.status(404).json({
                        message: "no user w/ this ID"
                    });
                    return;
                }
                res.json(userData);
            }).catch((err) => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, body, {
            new: true
        }).then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({
                    message: "No thought related to this ID"
                });
                return;
            }
            res.json(thoughtData);
        }).catch((err) =>
            res.status(500).json(err));

    },
    // delete
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({
            _id: params.thoughtId
        }).then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({
                    message: "No thought related to this ID"
                });
                return;
            } res.json({
                message: "thought is deleted"
            });

        }).catch((err) => res.status(500).json(err));

    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $addToSet: {
                reactions: body
            }
        }, {
            new: true,
        }).then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({
                    message: "No thought related to this ID"
                });
                return;
            } res.json(thoughtData);

        }).catch((err) => res.status(500).json(err));
    },
    deleteReaction({ params }, res) {
        // findeone&update or deleteOne
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $pull: {
                    reactions:
                    {
                        reactionId: params.reactionId
                    }
                }
            },
            {
                new: true,

            })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));

    },
};



module.exports = thoughtController