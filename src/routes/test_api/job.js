const express = require('express');
const router = express.Router();

// CONTROLLER
const jobController = require('../../controllers/test_api/JobController');

// ROUTER
router.get('/', jobController.JobFullList); // get all job
router.get('/latest-jobs', jobController.findLatestJobs); //get lastest job
router.get('/latest-browse-jobs', jobController.latestBrowseJob); // get lastest browse jobs (page)
router.get('/full-time', jobController.fullTimeJobs); //get full time (page)
router.get('/part-time', jobController.partTimeJobs); // get part time (page)
router.get('/find-job', jobController.findJobs); // find job ()
router.get('/details/:id', jobController.jobDetails); // detail job
router.get('/update-job-status', jobController.jobUpdateStatus); //update job status
router.post('/create-job', jobController.createJob); // create job (POST)
router.post('/update-job/:id', jobController.updateJob); // update job
router.delete('/:id', jobController.deleteJob); // delete job
router.get('/', jobController.JobFullList); // get all job

// EXPORTS
module.exports = router;