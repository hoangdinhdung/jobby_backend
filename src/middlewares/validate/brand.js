const { body, param, query, validationResult } = require('express-validator');
const models = require('../../models');
const { Op } = require("sequelize");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 500,
        message: errors.array()[0].msg
      });
    }
    next();
  };
  exports.validateGetListBrand = [
    query('created_at_from')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày khởi tạo bắt đầu hợp lệ.')
      .custom((value, { req }) => {
        const created_at_from = new Date(value);
        const created_at_to = req.query.created_at_to ? new Date(req.query.created_at_to) : null;
  
        if (created_at_to && created_at_from > created_at_to) {
            throw new Error('Ngày khởi tạo bắt đầu phải nhỏ hơn hoặc bằng ngày khởi tạo kết thúc.');
        }
  
        return true;
      }),
    query('created_at_to')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày khởi tạo kết thúc hợp lệ.'),
    query('updated_at_from')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày cập nhật bắt đầu hợp lệ.')
      .custom((value, { req }) => {
        const updated_at_from = new Date(value);
        const updated_at_to = req.query.updated_at_to ? new Date(req.query.updated_at_to) : null;
  
        if (updated_at_to && updated_at_from > updated_at_to) {
            throw new Error('Ngày cập nhật bắt đầu phải nhỏ hơn hoặc bằng ngày cập nhật kết thúc.');
        }
  
        return true;
      }),
    query('updated_at_to')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày cập nhật kết thúc hợp lệ.'),
    query('deleted_at_from')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày xóa bắt đầu hợp lệ.')
      .custom((value, { req }) => {
        const deleted_at_from = new Date(value);
        const deleted_at_to = req.query.deleted_at_to ? new Date(req.query.deleted_at_to) : null;
  
        if (deleted_at_to && deleted_at_from > deleted_at_to) {
            throw new Error('Ngày xóa bắt đầu phải nhỏ hơn hoặc bằng ngày xóa kết thúc.');
        }
  
        return true;
      }),
    query('deleted_at_to')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Vui lòng nhập ngày xóa kết thúc hợp lệ.'),
    query('page')
      .optional()
      .isNumeric().withMessage('Tham số page phải là số.'),
    query('limit')
      .optional()
      .isNumeric().withMessage('Tham số limit phải là số.'),
    handleValidationErrors
  ];
  exports.validateGetOneBrand = [
    param('id')
      .notEmpty().withMessage('Params id brand không được để trống.')
      .isNumeric().withMessage("Params id brand không hợp lệ")
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const brands = await models.Brand.getAll({ where: condition });
        if(!brands || brands.length == 0){
          throw new Error('Params id brand không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ]
  exports.validateCreateBrand = [
    body('name')
      .notEmpty().withMessage('Tên brand không được để trống.')
      .isLength({ max: 255 }).withMessage('Tên brand không được quá 255 kí tự')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.name = {
          [Op.eq]: value
        };
        const brands = await models.Brand.getAll({ where: condition });
        if(brands && brands.length > 0){
          throw new Error('Tên brand đã tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ]
  exports.validateUpdateBrand = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const brands = await models.Brand.getAll({ where: condition });
        if(!brands || brands.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    body('name')
      .optional()
      .custom(async (value, { req }) => {
        const condition = {};
        condition.name = {
          [Op.eq]: value
        };
        condition.id = {
          [Op.ne]: req.params.id
        }
        const brands = await models.Brand.getAll({ where: condition });
        if(brands && brands.length > 0){
          throw new Error('Tên brand đã tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ];
  exports.validateDeleteBrand = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const brands = await models.Brand.getAll({ where: condition });
        if(!brands || brands.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ];
  exports.validateDeleteManyBrand = [
    body('ids')
      .isArray().withMessage('Danh sách id brand cần xóa phải là mảng.')
      .notEmpty().withMessage('Danh sách id brand cần xóa không được trống.'),
    handleValidationErrors  
  ];
  exports.validateRestoreBrand = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const brands = await models.Brand.getAll({ where: condition });
        if(!brands || brands.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ];
  exports.validateRestoreManyBrand = [
    body('ids')
      .isArray().withMessage('Danh sách id brand cần phục hồi phải là mảng.')
      .notEmpty().withMessage('Danh sách id brand cần phục hồi không được trống.'),
    handleValidationErrors
  ];