const express = require('express');
const router = express.Router();

// CONTROLLER
const jobController = require('../../controllers/test_api/JobController');

// ROUTER
router.get('/api/v1/', jobController.JobFullList);
router.get('/api/v1/latest-jobs', jobController.findLatestJobs);
router.get('/api/v1/latest-browse-jobs', jobController.latestBrowseJob);
router.get('/api/v1/full-time', jobController.fullTimeJobs);
router.get('/api/v1/part-time', jobController.partTimeJobs);
router.get('/api/v1/find-job', jobController.findJobs);
router.get('/api/v1/details/:id', jobController.jobDetails);
router.get('/api/v1/update-job', jobController.jobUpdate);

// EXPORTS
module.exports = router;