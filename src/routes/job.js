const express = require('express');
const router = express.Router();

// CONTROLLER
const jobController = require('../controllers/JobController');

// ROUTER
router.get('/', jobController.JobFullList);
router.get('/latest-jobs', jobController.findLatestJobs);
router.get('/latest-browse-jobs', jobController.latestBrowseJob);
router.get('/full-time', jobController.fullTimeJobs);
router.get('/part-time', jobController.partTimeJobs);
router.get('/find-job', jobController.findJobs);
router.get('/details/:id', jobController.jobDetails);
router.get('/update-job', jobController.jobUpdate);

// EXPORTS
module.exports = router;