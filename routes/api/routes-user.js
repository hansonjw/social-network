const router = require('express').Router();

// I think this is called a deconstructor
// essentially getting all of the methods from the controller for use here in the routes
const {
    getAllUser,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
    addFriendtoUser,
    removeFriendfromUser
} = require('../../controllers/controller-user');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

router
    .route('/:id')
    .get(getUserbyId)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriendtoUser)
    .delete(removeFriendfromUser)

module.exports = router;