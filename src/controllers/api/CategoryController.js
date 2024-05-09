// requires 
const models = require('../../models');
const bcrypt = require('bcryptjs');
const { Op, condition } = require("sequelize");
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const nodemailer = require('nodemailer');

const secretAccessToken = process.env.ACCESS_TOKEN_SECRET || 'access-token';
const expireAccessToken  = process.env.ACCESS_TOKEN_SECRET_EXPIRE || '1d'

const BrandController = {
    list: async (req, res) =>{
        try{
            let {
                page,
                limit,
                name,
                created_at_from,
                created_at_to,
                updated_at_from,
                updated_at_to,
                deleted_at_from,
                deleted_at_to,
                isActive
            } = req.query;
            page = page && parseInt(page) || 1;
            limit = limit && parseInt(limit) || 10;
            let field;
            let condition = {};
            if(name && name.trim() != ''){
                condition.name = {
                    [Op.substring]: name
                }
            }
            if(created_at_from){
                condition.created_at = {
                    [Op.gte]: created_at_from
                }
            }
            if(created_at_to){
                condition.created_at = {
                    [Op.lte]: created_at_to
                }
            }
            if(updated_at_from){
                condition.updated_at = {
                    [Op.gte]: updated_at_from
                }
            }
            if(updated_at_to){
                condition.updated_at = {
                    [Op.lte]: updated_at_to
                }
            }
            if(deleted_at_from){
                condition.deleted_at = {
                    [Op.gte]: deleted_at_from
                }
            }
            if(deleted_at_to){
                condition.deleted_at = {
                    [Op.lte]: deleted_at_to
                }
            }
            if(isActive && isActive == "1"){
                condition.deleted_at = {
                    [Op.eq]: null 
                }
            }
            const result = await models.Category.getList({
                where:condition,
                attributes:field,
                offset: (page - 1) * limit, 
                limit
            });
            res.json({
                code:200,
                message: 'success',
                data:result
            })
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    getOne: async (req, res) =>{
        try{
            const { id } = req.params;
            const condition = {};
            condition.id = {
                [Op.eq]: id
            };
            let categories = await models.Category.getAll({
                where:condition
            });
            const category = categories && categories[0] || null;
            res.json({
                code: 200,
                message: 'get one success',
                data: category
            });
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    create: async (req, res) =>{
        try{
            const { name } = req.body;
            const payload = {};
            payload.name = name;
            payload.created_at = new Date();
            const category = await models.Category.create(payload);
            res.json({
                code:200,
                message: 'Tạo category thành công.',
                data: category
            });
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    update: async (req, res) =>{
        try{
            const payload = {};
            Object.keys(req.body).forEach(key =>{
                if(req.body[key]){
                    if(typeof req.body[key] == 'string' && req.body[key].trim() != ''){
                        payload[key] = req.body[key];
                    }
                    if(typeof req.body[key] != 'string'){
                        payload[key] = req.body[key];
                    }
                }
            });
            payload.updated_at = new Date();
            const condition = {};
            condition.id = {
                [Op.eq]: req.params.id
            };
            const updateBrand = await models.Category.updateMany(payload, condition);
            if(updateBrand){
                res.json({
                    code:200,
                    message: "Cập nhật thông tin thành công."
                })
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    delete: async (req, res) =>{
        try{
            const { id } = req.params;
            const condition = {};
            const payload = {
                deleted_at: new Date()
            }
            condition.id = {
                [Op.eq]: id
            }
            const deleted = await models.Category.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Xoá category thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Xoá category không thành công."
                })
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    deleteMany: async (req, res) =>{
        try{
            const { ids } = req.body;
            const condition = {};
            const payload = {
                deleted_at: new Date()
            }
            condition.id = {
                [Op.in]: ids
            }
            const deleted = await models.Category.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Xoá nhiều category thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Xoá nhiều category không thành công."
                })
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    restore: async (req, res) =>{
        try{
            const { id } = req.params;
            const condition = {};
            const payload = {
                deleted_at: null
            }
            condition.id = {
                [Op.eq]: id
            }
            const deleted = await models.Category.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Phục hồi category thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Phục hồi category không thành công."
                })
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
    restoreMany: async (req, res) =>{
        try{
            const { ids } = req.body;
            const condition = {};
            const payload = {
                deleted_at: null
            }
            condition.id = {
                [Op.in]: ids
            }
            const deleted = await models.Category.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Phục hồi nhiều category thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Phục hồi nhiều category không thành công."
                })
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.status(500).send({
                code:500,
                message: error.message || error
            })
        }
    },
}

module.exports = BrandController;