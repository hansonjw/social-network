const router =require('express').Router();
const {
    getAllThought,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/controller-thought.js');

// /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;