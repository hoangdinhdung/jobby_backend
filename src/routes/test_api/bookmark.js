// REQUIRES //
const express = require('express');
const router = express.Router();

// BOOKMARK CONTROLLER //
const bookmarkController = require('../../controllers/test_api/BookmarkController');

// ROUTER //
router.get('/', bookmarkController.bookmarkFullList);

// EXPORTS //
module.exports = router;