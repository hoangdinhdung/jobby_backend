const express = require("express");

const router = express.Router();

//CONTROLLER
const userController = require('../../controllers/api/UserController'); 

// VALIDATE
const { 
    validateGetListUser,
    validateUpdateUser,
    validateDeleteUser,
    validateDeleteManyUser,
    validateRestoreUser,
    validateRestoreManyUser,
    validateGetOneUser
} = require("../../middlewares/validate");

//ROUTES
router.get('/get-list', validateGetListUser, userController.list);
router.get('/get-one/:id', validateGetOneUser, userController.getOne);
router.put('/edit/:id', validateUpdateUser, userController.update);
router.delete('/delete-one/:id', validateDeleteUser, userController.delete);
router.delete('/delete-many', validateDeleteManyUser, userController.deleteMany);
router.put('/restore-one/:id', validateRestoreUser, userController.restore);
router.put('/restore-many', validateRestoreManyUser, userController.restoreMany);



//EXPORTS 
module.exports = router;