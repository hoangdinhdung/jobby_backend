const express = require('express');
const router = express.Router();

// CONTROLLER
const stateController = require('../controllers/StateController');
const { route } = require('./admin');

// ROUTES
router.get('/', stateController.stateFullList);
router.get('/:id', stateController.stateById);
router.post('/add-a-state', stateController.createState);
router.get('/increase-jobs/:id', stateController.increaseJobs);
router.post('/update-state/:id', stateController.updateState);
router.delete('/delete/:id', stateController.deleteState);


// EXPORT
module.exports = router;
