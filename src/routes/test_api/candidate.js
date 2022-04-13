// REQUIRES
const express = require('express');
const router = express.Router();

// CONTROLLER
const candidateController = require('../../controllers/test_api/CandidateController');

//ROUTER
router.get('/api/v1/', candidateController.candidateFullList);
router.post('/api/v1/register', candidateController.createCandiate);
router.get('/api/v1/get-page', candidateController.candidateWithPageLimit);
router.all('/api/v1/featured-candidates', candidateController.featuredCandidates);

module.exports = router;