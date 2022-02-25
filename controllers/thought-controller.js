const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .populate({
                path: "thoughts",
                select: "-__v",
            }).select("-__v")
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.stauts(404).json(err);
            });
    },
    // get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({
            _id: params.id
        }).then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({
                    message: "No thought related to this ID"
                });
                return;
            }
            res.json(thoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
},
createThought({body}, res){
    console.log(body);
    Thought.create(body)
    .then((thoughtData)=>{
        return User.findOneAndUpdate({
            _id: body.userId
        },{
            $push: {thoughts: thoughtData._id}
        },{
            new: true
        });
    }).then((userData) => {
        if (!userData){
            res.status(404).json({
                message: "no user w/ this ID"
            });
            return;
        }
        res.json(userData);
    }).catch((err)=> res.json(err));
},
updateThought({params, body}, res){
    Thought.findOneAndUpdate({
        _id: params.id
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
        res.status(400).json(err));

},
















module.exports = thoughtController