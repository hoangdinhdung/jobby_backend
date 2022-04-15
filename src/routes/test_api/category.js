// REQUIRES
const express = require('express');
const router = express.Router();

// CONTROLLER
const categoryController = require('../../controllers/test_api/CategoryController');

// ROUTER
router.get('/', categoryController.categoryFullList);

// EXPORTS
module.exports = router;