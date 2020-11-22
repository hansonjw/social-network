const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "please provide a valid reaction...",
            maxlength: 280
        },
        username: {
            type: String,
            required: "please provide a valid username..."
        },
        createdAt: {
            type: Date,
            default: Date.now,  
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const ThoughtSchema = Schema(
    {
        thoughtText: {
            type: String,
            reqired: "please provide a valid thought...",
            minLength: 1,
            maxLength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        // I'm not sure about this...I think I need to reference the user model somehow...
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;



