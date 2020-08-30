// 3rd party modules
const express = require('express');
const Razorpay = require('razorpay');
// custome module
const {
    createOrder,
    confirmPayment,
} = require('../controllers/paymentsController');

const router = express.Router();

router.route('/order/:amount').get(createOrder);
router.route('/confirm').post(confirmPayment);

module.exports = router;
