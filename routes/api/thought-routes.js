const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// all thoughts /api/thoughts <GET>
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id 
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought); 

//   /api/thoughts/:thoughtId/reactions 
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;