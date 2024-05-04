// requires 
const models = require('../../models');
const bcrypt = require('bcryptjs');
const { Op, condition } = require("sequelize");
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const nodemailer = require('nodemailer');

const secretAccessToken = process.env.ACCESS_TOKEN_SECRET || 'access-token';
const expireAccessToken  = process.env.ACCESS_TOKEN_SECRET_EXPIRE || '1d'

const UserController = {
    list: async (req, res) =>{
        try{
            let {
                page,
                limit,
                name,
                email,
                phone_number,
                isAdmin,
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
            if(email && email.trim() != ''){
                condition.email = {
                    [Op.substring]: email
                }
            }
            if(phone_number && phone_number.trim() != ''){
                condition.phone_number = {
                    [Op.substring]: phone_number
                }
            }
            if(isAdmin){
                condition.isAdmin = {
                    [Op.eq]: isAdmin
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
            const result = await models.User.getList({
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
            if(payload.password){
                payload.password = bcrypt.hashSync(payload.password, 5);
            }
            const condition = {};
            condition.id = {
                [Op.eq]: req.params.id
            };
            const updateUser = await models.User.updateMany(payload, condition);
            if(updateUser){
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
            const deleted = await models.User.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Xoá người dùng thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Xoá người dùng không thành công."
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
            const deleted = await models.User.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Xoá nhiều người dùng thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Xoá nhiều người dùng không thành công."
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
            const deleted = await models.User.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Phục hồi người dùng thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Phục hồi người dùng không thành công."
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
            const deleted = await models.User.updateMany(payload, condition);
            if(deleted){
                res.json({
                    code: 200,
                    message: "Phục hồi nhiều người dùng thành công."
                })
            }else{
                res.status(500).send({
                    code:500,
                    essage: "Phục hồi nhiều người dùng không thành công."
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

module.exports = UserController;