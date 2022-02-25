const {Schema, model}= require('mongoose')
// const

// user model
const userSchema = new Schema(
{
    username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    },


    email: {
    type: String,
    unique: true,
    required: true,
    alidate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },


thoughts 
Array of _id values referencing the Thought model


    friends
    Array of _id values referencing the User model (self-reference)
}
)
module.exports = User;