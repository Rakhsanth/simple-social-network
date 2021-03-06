//3rd party modules
const express = require('express');
// custom modules
const { protectRoute } = require('../middlewares/authMiddlewares');
const {
    getCurrentUserProfile,
    createProfile,
    updateProfile,
    getAllProfiles,
    getProfileByUserId,
    deleteUserAndProfile,
    getGithubRepos,
    uploadProfilePicture,
} = require('../controllers/profilesController');
const uploadProfileImage = require('../fileUploads/fileUploader');
const Profile = require('../models/Profile');
const advancedResults = require('../utils/advancedResults');

const router = express.Router();

const populate = {
    path: 'user', // This us the ref using in this mongoose schema (foreign field)
    select: 'name avatar',
};

router.route('/me').get(protectRoute, getCurrentUserProfile);
router
    .route('/')
    .get(advancedResults(Profile, populate), getAllProfiles)
    .post(protectRoute, createProfile)
    .put(protectRoute, updateProfile);

router
    .route('/users/:id')
    .get(getProfileByUserId)
    .delete(protectRoute, deleteUserAndProfile);

router.route('/github/:username').get(getGithubRepos);

router.route('/picture/upload/:id').put(protectRoute, uploadProfilePicture);

// router.route('/')

module.exports = router;
