//3rd party modules
const express = require('express');
// custom modules
const { registerUser } = require('../controllers/authControllers');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post();

module.exports = router;
