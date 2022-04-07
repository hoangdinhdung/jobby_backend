// REQUIRES //
const express = require('express');
const router = express.Router();

// CONTROLLER //
const projectController = require('../controllers/ProjectController');

//ROUTER //
router.get('/get-all-project', projectController.projectFullList);
router.get('/', projectController.projectPage);
router.get('/find-project', projectController.findProject);

// EXPORTS //
module.exports = router;