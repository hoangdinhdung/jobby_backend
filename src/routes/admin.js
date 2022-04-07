const express = require("express");

const router = express.Router();

//CONTROLLER
const adminController = require("../controllers/AdminController");

//ROUTES
router.get('/', adminController.adminFullList);

//EXPORTS 
module.exports = router;