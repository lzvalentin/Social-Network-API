const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 280,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    //    getter method to format timestamp
        // get: 
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

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default:()=> new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    username:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        // get
    },
}, {
    toJSON: {
        getters: true,
    },
})

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reaction.length
})

const Thought= model("Thought", thoughtSchema);

module.exports=Thought;