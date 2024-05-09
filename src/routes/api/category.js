const express = require("express");

const router = express.Router();

//CONTROLLER
const categoryController = require('../../controllers/api/CategoryController'); 

// VALIDATE
const { 
    validateGetListCategory,
    validateUpdateCategory,
    validateDeleteCategory,
    validateDeleteManyCategory,
    validateRestoreCategory,
    validateRestoreManyCategory,
    validateGetOneCategory,
    validateCreateCategory
} = require("../../middlewares/validate/index");

//ROUTES
router.get('/get-list', validateGetListCategory, categoryController.list);
router.get('/get-one/:id', validateGetOneCategory, categoryController.getOne);
router.post('/', validateCreateCategory, categoryController.create);
router.put('/edit/:id', validateUpdateCategory, categoryController.update);
router.delete('/delete-one/:id', validateDeleteCategory, categoryController.delete);
router.delete('/delete-many', validateDeleteManyCategory, categoryController.deleteMany);
router.put('/restore-one/:id', validateRestoreCategory, categoryController.restore);
router.put('/restore-many', validateRestoreManyCategory, categoryController.restoreMany);



//EXPORTS 
module.exports = router;