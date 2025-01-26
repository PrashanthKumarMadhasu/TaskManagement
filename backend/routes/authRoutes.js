const express = require('express');
const { register, login} = require('../controllers/authController');
const {sendOTP, otpVerification, updatePassword} =require('../controllers/otpController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//forgetPassword API's
router.post('/forgetPassword', sendOTP);
router.post('/verifyOtp', otpVerification);
router.post('/updatePassword', updatePassword);

module.exports = router;
