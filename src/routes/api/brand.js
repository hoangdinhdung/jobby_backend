const express = require("express");

const router = express.Router();

//CONTROLLER
const brandController = require('../../controllers/api/BrandController'); 

// VALIDATE
const { 
    validateGetListBrand,
    validateUpdateBrand,
    validateDeleteBrand,
    validateDeleteManyBrand,
    validateRestoreBrand,
    validateRestoreManyBrand,
    validateGetOneBrand,
    validateCreateBrand
} = require("../../middlewares/validate/index");

//ROUTES
router.get('/get-list', validateGetListBrand, brandController.list);
router.get('/get-one/:id', validateGetOneBrand, brandController.getOne);
router.post('/', validateCreateBrand, brandController.create);
router.put('/edit/:id', validateUpdateBrand, brandController.update);
router.delete('/delete-one/:id', validateDeleteBrand, brandController.delete);
router.delete('/delete-many', validateDeleteManyBrand, brandController.deleteMany);
router.put('/restore-one/:id', validateRestoreBrand, brandController.restore);
router.put('/restore-many', validateRestoreManyBrand, brandController.restoreMany);



//EXPORTS 
module.exports = router;