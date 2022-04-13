const express = require('express');
const router = express.Router();

// CONTROLLER
const stateController = require('../../controllers/test_api/StateController');
const { route } = require('./admin');

// ROUTES
router.get('/api/v1/', stateController.stateFullList);
router.get('/api/v1/:id', stateController.stateById);
router.post('/api/v1/add-a-state', stateController.createState);
router.get('/api/v1/increase-jobs/:id', stateController.increaseJobs);
router.post('/api/v1/update-state/:id', stateController.updateState);
router.delete('/api/v1/delete/:id', stateController.deleteState);


// EXPORT
module.exports = router;
