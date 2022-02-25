const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .sort({
                _id: -1
            })
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },
    getUserByID(req, res) {
        User.findOne({
            _id: params.id
        })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .then((userData) => {
                if (!userData) {
                    res.status(500).json({
                        message: "No user Found"
                    });
                    return;
                }
                res.json(userData);
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then(newUser => res.status(200).json(newUser))
            .catch(err => {
                res.status(500).json(err)
            })

    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params.id
        },
            body, {
            new: true
        }).then((userData) => {
            if (!userData) {
                res.status(404)({
                    message: "Invalid ID"
                });
                return;
            }
            res.json(userData);
        }).catch((err) => res.status(500).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({
            _id: params.id
        }).then((userData) => {
            if (!userData) {
                res.status(404)({
                    message: "Invalid ID"
                });
                return;
            }
                res.json(userData);
            }).catch((err) => res.status(500).json(err));
    },
    addFriend({params}, res){
        User.findOneAndUpdate({
            _id: params.id
        }, {
            $addToSet:{
                friends: paramas.friendsId
            }
        }, {
            new: true
        }).then((userData) => res.json(userData))
        .catch((err) => (400).json(err));    
    }, 


}
 


