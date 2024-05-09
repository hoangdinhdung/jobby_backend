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
  exports.validateGetListUser = [
    query('isAdmin')
      .optional()
      .isNumeric().withMessage('Tham số isAdmin phải là số.')
      .isIn([1, 0]).withMessage('Tham số isAdmin phải là giá trị 1 hoặc 0.'),
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
  exports.validateUpdateUser = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const users = await models.User.getAllUser({ where: condition });
        if(!users || users.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    body('email')
      .optional()
      .isEmail().withMessage('Email không đúng định dạng.')
      .custom(async(value, { req })=>{
        const condition = {};
        condition.email = {
          [Op.eq]: value
        };
        condition.id = {
          [Op.ne]: req.params.id
        }
        const users = await models.User.getAllUser({ where: condition });
        if(users && users.length > 0){
          throw new Error('Email đã tồn tại.')
        }
        return true;
      }),
    body('isAdmin')
      .optional()
      .isIn([0, 1]).withMessage('isAdmin phải là 0 hoặc 1'),
    handleValidationErrors
  ];
  exports.validateDeleteUser = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const users = await models.User.getAllUser({ where: condition });
        if(!users || users.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ];
  exports.validateDeleteManyUser = [
    body('ids')
      .isArray().withMessage('Danh sách id người dùng cần xóa phải là mảng.')
      .notEmpty().withMessage('Danh sách id người dùng cần xóa không được trống.'),
    handleValidationErrors  
  ];
  exports.validateRestoreUser = [
    param('id')
      .isNumeric()
      .toInt()
      .withMessage('Id không hợp lệ.')
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const users = await models.User.getAllUser({ where: condition });
        if(!users || users.length == 0){
          throw new Error('Id không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ];
  exports.validateRestoreManyUser = [
    body('ids')
      .isArray().withMessage('Danh sách id người dùng cần phục hồi phải là mảng.')
      .notEmpty().withMessage('Danh sách id người dùng cần phục hồi không được trống.'),
    handleValidationErrors
  ];
  exports.validateGetOneUser = [
    param('id')
      .notEmpty().withMessage('Params id người dùng không được để trống.')
      .isNumeric().withMessage("Params id người dùng không hợp lệ")
      .custom(async (value, { req }) => {
        const condition = {};
        condition.id = {
          [Op.eq]: value
        };
        const users = await models.User.getAllUser({ where: condition });
        if(!users || users.length == 0){
          throw new Error('Params id người dùng không tồn tại');
        } 
        return true;
      }),
    handleValidationErrors
  ]
