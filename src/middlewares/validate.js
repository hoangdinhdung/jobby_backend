const { body, validationResult } = require('express-validator');
const models = require('../models');
const { Op } = require("sequelize");

exports.validateLogin = [
    body('email')
      .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          code:500,
          message: errors.array()[0].msg
        });
      }
      next();
    }
  ];
exports.validateRegister = [
  body('email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ')
    .custom(async (value)=>{
      const condition = {}; // conditon query
      condition.email = {
          [Op.eq]: value
      }
      const users = await models.User.getAllUser({
        where: condition
      });
      if(users && users.length > 0){
        return Promise.reject('Email đã tồn tại');
      }
    }),
  body('password')
    .notEmpty().withMessage('Mật khẩu không được để trống'),
  body('isAdmin')
    .optional()
    .isIn([0, 1]).withMessage('isAdmin phải là 0 hoặc 1'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code:500,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];
exports.validateSendVerificaton = [
  body('email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ')
    .custom(async (value)=>{
      const condition = {}; // conditon query
      condition.email = {
          [Op.eq]: value
      }
      const users = await models.User.getAllUser({
        where: condition
      });
      if(!users || users.length <= 0){
        return Promise.reject('Email không tồn tại');
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code:500,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];
exports.validateVerifyCode = [
  body('email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ')
    .custom(async (value)=>{
      const condition = {}; // conditon query
      condition.email = {
          [Op.eq]: value
      }
      const users = await models.User.getAllUser({
        where: condition
      });
      if(!users || users.length <= 0){
        return Promise.reject('Email không tồn tại');
      }
    }),
  body('code')
  .notEmpty().withMessage('Mã xác nhận không được để trống'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code:500,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];