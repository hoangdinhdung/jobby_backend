const express = require("express");

const router = express.Router();

//CONTROLLER
const testController = require("../../controllers/api/TestController");

//ROUTES
router.get('/test', testController.test);

//EXPORTS 
module.exports = router;