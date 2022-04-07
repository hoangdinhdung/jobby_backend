// REQUIRES
const express = require('express');
const router = express.Router();

// CONTROLLER
const candidateController = require('../controllers/CandidateController');

//ROUTER
router.get('/', candidateController.candidateFullList);
router.post('/register', candidateController.createCandiate);
router.get('/get-page', candidateController.candidateWithPageLimit);
router.all('/featured-candidates', candidateController.featuredCandidates);

module.exports = router;