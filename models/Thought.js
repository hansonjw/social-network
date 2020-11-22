const { Schema, model } = require('mongoose');
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



// Thought

// thoughtText
// String, Required
// Must be between 1 and 280 characters

// createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// username (The user that created this thought)
// String, Required

// reactions (These are like replies)
// Array of nested documents created with the reactionSchema

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



// Reaction (SCHEMA ONLY)

// reactionId
// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId

// reactionBody
// String, Required
// 280 character maximum

// username
// String, Required

// createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// Schema Settings
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

