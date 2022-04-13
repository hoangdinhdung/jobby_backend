// REQUIRES
const express = require('express');
const router = express.Router();

// CONTROLLER
const categoryController = require('../../controllers/test_api/CategoryController');

// ROUTER
router.get('/api/v1/', categoryController.categoryFullList);

// EXPORTS
module.exports = router;