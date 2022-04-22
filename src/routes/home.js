// REQUIRES //
const express = require('express');
const router = express.Router();
const JWT = require('../middlewares/JWT');
// CONTROLLER //
const homeController = require('../controllers/HomeController');

// ROUTER //

router.post('/login', homeController.login);
router.get('/refresh-token', homeController.refreshToken);
router.get('/logout', homeController.logout);
router.get('/', JWT.authenToken ,homeController.index);

module.exports = router;