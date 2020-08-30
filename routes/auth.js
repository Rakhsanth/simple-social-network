//3rd party modules
const express = require('express');
// custom modules
const {
    registerUser,
    loginUser,
    getCurrentUser,
    facebookLogin,
    setTokenToCookie,
} = require('../controllers/authController');
const { protectRoute } = require('../middlewares/authMiddlewares');
const User = require('../models/User');
const { request, response } = require('express');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protectRoute, getCurrentUser);
router.route('/facebookLogin').post(facebookLogin);

module.exports = router;
