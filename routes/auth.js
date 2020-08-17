//3rd party modules
const express = require('express');
// custom modules
const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require('../controllers/authControllers');
const { protectRoute } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protectRoute, getCurrentUser);

module.exports = router;
