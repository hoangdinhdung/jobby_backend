// requires 
const models = require('../../models');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');


const secretAccessToken = process.env.ACCESS_TOKEN_SECRET || 'access-token';
const expireAccessToken  = process.env.ACCESS_TOKEN_SECRET_EXPIRE || '1d'

const AuthController = {
    login: async (req, res) =>{
        try{
            const field = null; // list field
            const condition = {}; // conditon query
            condition.email = {
                [Op.eq]: req.body.email
            }
            const users = await models.User.getAllUser({
                field, 
                where: condition
            });
            const user = users && users[0] || null;
            if(!user){
                return res.json({
                    code: 500,
                    message: "Email không tồn tại."
                })
            }else{
                // check password
                const match = await bcrypt.compareSync(req.body.password, user.password);
                if(!match){
                    return res.json({
                        code: 500,
                        message: "Mật khẩu sai."
                    })
                }else{
                    // create Token
                    const accessToken = await jwt.sign({
                        email: user.email,
                        isAdmin:user.isAdmin
                    }, secretAccessToken, { expiresIn: expireAccessToken });

                    //set session accecsss token
                    req.session.accessToken = `Bearer ${accessToken}`;

                    return res.json({
                        code:200, 
                        message: 'Đăng nhập thành công.',
                        data:{
                            user,
                            accessToken
                        }
                    });
                }
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.json({
                code:500,
                message: error.message || error
            })
        }
    },
    register: async (req, res) =>{
        try{
            const passwordHashed = bcrypt.hashSync(req.body.password, 5);
            const obj =  {
                email: req.body.email,
                password: passwordHashed,
                phone_number: req.body.phone_number || "",
                name: req.body.name || "",
                isAdmin: req.body.isAdmin || 0
            }
            
            const newUser = await models.User.create(obj);
            res.json({
                code:200, 
                message: 'resgister ok!',
                data:newUser
            })
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.json({
                code:500,
                message: error.message || error
            })
        }
    },
}

module.exports = AuthController;