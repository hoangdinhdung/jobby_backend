// REQUIRES //
const express = require('express');
const router = express.Router();

// CONTROLLER //
const projectController = require('../../controllers/test_api/ProjectController');

//ROUTER //
router.get('/get-all-project', projectController.projectFullList);
router.get('/get-page', projectController.projectPage);
router.get('/find-project', projectController.findProject);

// EXPORTS //
module.exports = router;