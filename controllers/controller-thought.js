const { Thought } = require('../models');


const controllerThought = {
    
    // GET to get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(results => res.json(results))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // GET to get a single thought by its _id
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(results => {
            if(!results) {
                res.status(400).json( { message: "no thought found with this ID..."});
            }
            res.json(results);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },


    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    // example data
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    createThought({ body }, res) {
        Thought.create(body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json(err));
    },

    // PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate( { _id: params.id }, body, { new: true, runValidators: true } )
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no thought found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(results => {
            if(!results) {
                res.status(404).json({ message: "no thought found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    },


    // /api/thoughts/:thoughtId/reactions
    
    // POST to create a reaction stored in a single thought's reactions array field
    addReaction( {params, body}, res ) {
        Thought.findOneAndUpdate( {_id: params.thoughtId}, { $push: {reactions: body} }, {new: true, runValidators: true} )
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no thought found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction( {params}, res ) {
        Thought.findOneAndUpdate( {_id: params.thoughtId}, { $pull: {reactions: {_id: params.reactionId}} }, {new: true, runValidators: true} )
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no thought found with this id..."});
                return;
            }
            res.json("deleted!");
        })
        .catch(err => res.status(400).json(err));
    }


}


module.exports = controllerThought;







