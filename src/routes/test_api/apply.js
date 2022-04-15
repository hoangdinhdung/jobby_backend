// REQUIRES //
const express = require('express');
const router = express.Router();

// CONTROLLER //
const applyController = require('../controllers/ApplyController');

// ROUTES //
router.get('/', applyController.applyFullList);

// EXPORTS //
module.exports = router;