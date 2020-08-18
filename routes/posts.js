//3rd party modules
const express = require('express');
// custom modules
const { protectRoute } = require('../middlewares/authMiddlewares');
const {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    likeUnlikePost,
    addComment,
    deleteComment,
} = require('../controllers/postsControllers');
const advancedResults = require('../utils/advancedResults');
const Post = require('../models/Post');

const router = express.Router();

router
    .route('/')
    .get(protectRoute, advancedResults(Post), getAllPosts)
    .post(protectRoute, createPost);
router
    .route('/:id')
    .get(protectRoute, getPost)
    .delete(protectRoute, deletePost);
router.route('/likes/:id').put(protectRoute, likeUnlikePost);
router.route('/comments/:id').post(protectRoute, addComment);
router.route('/comments/:id/:commentId').delete(protectRoute, deleteComment);

module.exports = router;
