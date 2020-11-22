const { User, Thought } = require('../models');

// /api/users...this is the piece you have to map with the routes...
const controllerUser = {
    
    // GET all users
    getAllUser(req, res) {
        User.find({})
        .then(results => res.json(results))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // GET a single user by its _id and populated thought and friend data
    getUserbyId({ params }, res) {
        User.findOne({ _id: params.id })
        .then(results => {
            if(!results) {
                res.status(400).json( { message: "no result found..."});
            }
            res.json(results);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    // POST a new user:
    // example data
    // {
    //   "username": "lernantino",
    //   "email": "lernantino@gmail.com"
    // }
    createUser({ body }, res) {
        User.create(body)
        .then(results => res.json(results))
        .catch(err => res.status(400).json(err));
    },

    // PUT to update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no user found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to remove user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(results => {
            if(!results) {
                res.status(404).json({ message: "no user found with this id..."});
                return;
            }
            // this is not idea...deleting Thoughts based on username
            //ideally I would like to utilize the thoughts array
            Thought.deleteMany({ username: results.username })
            .then(thoughtResults => {
                if(!thoughtResults) {
                    res.status(404).json({ message: "no thoughts found with this username..."});
                    return;
                }
                res.json("user deleted...thoughts deleted...");
            })
        })
        .catch(err => res.status(400).json(err));
    },


    // Add new friend to a user's friend List
    // /api/users/:userId/friends/:friendId
    addFriend({ params, body }, res){
        User.findOneAndUpdate({ _id: params.userId },{ $push: {friends: params.friendId} }, {new: true})
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no user found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    },


    removeFriend({ params, body }, res){
        User.findOneAndUpdate({ _id: params.userId },{ $pull: {friends: params.friendId} }, {new: true})
        .then(results => {
            if (!results) {
                res.status(404).json({ message: "no user found with this id..."});
                return;
            }
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
    }




    // BONUS: Remove a user's associated thoughts when deleted.
    // Need to figures this out...
    // chain another then and query and delete from Thoughts, may have to utilize the $pull


}

module.exports = controllerUser;





