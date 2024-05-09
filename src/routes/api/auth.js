const express = require("express");

const router = express.Router();

//CONTROLLER
const authController = require("../../controllers/api/AuthController");

// VALIDATE
const { 
    validateLogin,
    validateRegister,
    validateSendVerificaton,
    validateVerifyCode
} = require("../../middlewares/validate/index");

//ROUTES
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/send-verification', validateSendVerificaton, authController.sendVerification);
router.post('/verify-code', validateVerifyCode, authController.verifyCode);


//EXPORTS 
module.exports = router;