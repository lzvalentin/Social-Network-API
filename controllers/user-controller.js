const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find()
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },
    getUserByID(req, res) {
        User.findOne({
            _id: req.params.userId
        }).select("-__v")
            .populate("friends")
            .populate("thoughts")
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({
                        message: "No user Found"
                    });
                }
                res.json(userData);
            }).catch(err => {
                res.status(500).json(err)
            })

    },
    createUser(req, res) {
        User.create(req.body)
            .then(newUser => res.status(200).json(newUser))
            .catch(err => {
                res.status(500).json(err)
            })

    },

    updateUserById({ params, body }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $set: body
            },
            {
                new: true
            }
        ).then((userData) => {
            if (!userData) {
                res.status(404)({
                    message: "Invalid ID"
                });
                return;
            }
            res.json(userData);
        }).catch((err) => res.status(500).json(err));
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({
            _id: params.userId
        }).then((userData) => {
            if (!userData) {
                res.status(404)({
                    message: "Invalid ID"
                });
                return;
            }
            res.json({ message: "user has been deleted" });
        }).catch((err) => res.status(500).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $addToSet: {
                    friends: params.friendId
                }
            },
            {
                new: true
            }
        )
            .then((userData) => res.json(userData))
            .catch((err) => res.status(400).json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $pull: {
                    friends: params.friendId
                }
            },
            {
                new: true
            }
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404)({
                        message: "Invalid ID"
                    });
                    return;
                }
                res.json({message: "deleted friend"});
            }).catch((err) => res.status(500).json(err))
    },


};

module.exports = userController



