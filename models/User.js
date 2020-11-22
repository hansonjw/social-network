const { Schema, model, Types } = require('mongoose');

// use the mongoose object 'Schema' to create a UserSchema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'you must to provide a valid username...',
        },
        email: {
            type: String,
            required: 'you must provide a valid email address...',
            match: [/.+\@.+\..+/] // email validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

// virtual 'friendCount' that retrieves the length of the user's friends array...
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the User Model employing the schema defined above
const User = model('User', UserSchema);

module.exports = User;