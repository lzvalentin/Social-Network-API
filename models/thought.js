const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)

    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,

});

// get total count of reactions & replies
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);


module.exports = Thought;