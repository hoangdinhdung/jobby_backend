// REQUIRES //
const express = require('express');
const router = express.Router();

// CONTROLLER //
const homeController = require('../controllers/HomeController');

// ROUTER //
router.get('/', homeController.index);

module.exports = router;