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

exports.validateGetListCategory = [
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
exports.validateGetOneCategory = [
param('id')
    .notEmpty().withMessage('Params id category không được để trống.')
    .isNumeric().withMessage("Params id category không hợp lệ")
    .custom(async (value, { req }) => {
    const condition = {};
    condition.id = {
        [Op.eq]: value
    };
    const categories = await models.Category.getAll({ where: condition });
    if(!categories || categories.length == 0){
        throw new Error('Params id category không tồn tại');
    } 
    return true;
    }),
handleValidationErrors
]
exports.validateCreateCategory = [
body('name')
    .notEmpty().withMessage('Tên category không được để trống.')
    .isLength({ max: 255 }).withMessage('Tên category không được quá 255 kí tự')
    .custom(async (value, { req }) => {
    const condition = {};
    condition.name = {
        [Op.eq]: value
    };
    const categories = await models.Category.getAll({ where: condition });
    if(categories && categories.length > 0){
        throw new Error('Tên category đã tồn tại');
    } 
    return true;
    }),
handleValidationErrors
]
exports.validateUpdateCategory = [
param('id')
    .isNumeric()
    .toInt()
    .withMessage('Id không hợp lệ.')
    .custom(async (value, { req }) => {
    const condition = {};
    condition.id = {
        [Op.eq]: value
    };
    const categories = await models.Category.getAll({ where: condition });
    if(!categories || categories.length == 0){
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
    const categories = await models.Category.getAll({ where: condition });
    if(categories && categories.length > 0){
        throw new Error('Tên category đã tồn tại');
    } 
    return true;
    }),
handleValidationErrors
];
exports.validateDeleteCategory = [
param('id')
    .isNumeric()
    .toInt()
    .withMessage('Id không hợp lệ.')
    .custom(async (value, { req }) => {
    const condition = {};
    condition.id = {
        [Op.eq]: value
    };
    const categories = await models.Category.getAll({ where: condition });
    if(!categories || categories.length == 0){
        throw new Error('Id không tồn tại');
    } 
    return true;
    }),
handleValidationErrors
];
exports.validateDeleteManyCategory = [
body('ids')
    .isArray().withMessage('Danh sách id category cần xóa phải là mảng.')
    .notEmpty().withMessage('Danh sách id category cần xóa không được trống.'),
handleValidationErrors  
];
exports.validateRestoreCategory = [
param('id')
    .isNumeric()
    .toInt()
    .withMessage('Id không hợp lệ.')
    .custom(async (value, { req }) => {
    const condition = {};
    condition.id = {
        [Op.eq]: value
    };
    const categories = await models.Category.getAll({ where: condition });
    if(!categories || categories.length == 0){
        throw new Error('Id không tồn tại');
    } 
    return true;
    }),
handleValidationErrors
];
exports.validateRestoreManyCategory = [
body('ids')
    .isArray().withMessage('Danh sách id category cần phục hồi phải là mảng.')
    .notEmpty().withMessage('Danh sách id category cần phục hồi không được trống.'),
handleValidationErrors
];