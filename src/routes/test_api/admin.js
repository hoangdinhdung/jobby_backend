const express = require("express");

const router = express.Router();

//CONTROLLER
const adminController = require("../../controllers/test_api/AdminController");

//ROUTES
router.get('/', adminController.adminFullList);

//EXPORTS 
module.exports = router;