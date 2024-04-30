const express = require("express");

const router = express.Router();

//CONTROLLER
const authController = require("../../controllers/api/AuthController");

// VALIDATE
const { 
    validateLogin,
    validateRegister
} = require("../../middlewares/validate");

//ROUTES
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);

//EXPORTS 
module.exports = router;