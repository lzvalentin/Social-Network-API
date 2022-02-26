const { Schema, model } = require('mongoose')
// const

// schema user model
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
            // validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }, {
        toJSON: {
            virtuals: true,
        },
        id: false,

});
    

// create virtual friendCount retrieves length of user's friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// initialize user model
const User = model('User', userSchema)

module.exports = User;