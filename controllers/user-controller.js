const {user} =require("../models");

const userController ={
    getAllUsers( req, res){
        user.find({})
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
getUserByID(req, res){
    user.findOne({
        _id: params.id
    })
    .populate({
        path: "thoughts",
        select: "-__v",
    })
    .select("-__v")
    .then((userData) => {
        if (!userData){
            res.status(500).json({
                message: "No user Found"
            });
            return;
        }
        res.json(userData);
    })
},
createUser(req, res){
    user.create()
}
}