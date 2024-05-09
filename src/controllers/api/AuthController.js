// requires 
const models = require('../../models');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const nodemailer = require('nodemailer');

const secretAccessToken = process.env.ACCESS_TOKEN_SECRET || 'access-token';
const expireAccessToken  = process.env.ACCESS_TOKEN_SECRET_EXPIRE || '1d'

const AuthController = {
    login: async (req, res) =>{
        try{
            const field = null; // list field
            const condition = {}; // conditon query
            // req.body.email = `' or ''='`;

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
                isAdmin: req.body.isAdmin || 0,
                created_at: new Date()
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
    sendVerification:async (req, res) =>{
        try{
            const { email } = req.body;
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const field = null; // list field
            const condition = {}; // conditon query
            condition.email = {
                [Op.eq]: req.body.email
            }
            const passwordResetToken = await models.PasswordResetToken.getOne({
                field, 
                where: condition
            });
            let newPasswordResetToken
            if(!passwordResetToken){
                newPasswordResetToken = await models.PasswordResetToken.createOne({
                    email:req.body.email,
                    token: verificationCode,
                    created_at: new Date()
                });
            }else{
                const data = {
                    email:req.body.email,
                    token: verificationCode,
                    created_at: new Date()
                };
                
                newPasswordResetToken = await models.PasswordResetToken.updateMany(data, condition);
            }
            // console.log('verificationCode', verificationCode, passwordResetToken);
            if(newPasswordResetToken){
                // send email
                const transporter = nodemailer.createTransport({
                    service: process.env.SERVICE_GMAL || 'gmail',
                    auth: {
                        user: process.env.GMAIL_ACC || 'mnorelply@gmail.com',
                        pass: process.env.GMAIL_PASS || 'hklzjnjiubayrlys'
                    }
                });

                const mailOptions = {
                    from: process.env.GMAIL_ACC || 'mnorelply@gmail.com',
                    to: email,
                    subject: 'Verification Code',
                    text: `Your verification code is: ${verificationCode}`
                  };
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // console.log(error);
                    res.json({
                        code:500,
                        message: 'Error sending verification email' + error.message || error
                    });
                } else {
                    // console.log('Email sent: ' + info.response);
                    res.json({
                        code:200,
                        message: 'Verification email sent'
                    });
                }
                });
              
            }
        }catch(error){
            console.log(`ERROR: ${error}`);
            res.json({
                code:500,
                message: error.message || error
            })
        }
    },
    verifyCode: async (req, res) =>{
        try{
            const { email, code } = req.body;
            const field = null; // list field
            const condition = {}; // conditon query
            condition.email = {
                [Op.eq]: req.body.email
            }
            condition.token = {
                [Op.eq]: req.body.code
            }
            const time_expire = new Date(new Date().getTime() - 5 * 60 * 1000); //df 5 minutes + 7 for UTC
            condition.created_at = {
                [Op.gte]: time_expire
            }
            const verification = await models.PasswordResetToken.getOne({
                field, 
                where: condition
            });
            if(!verification){
                return res.json({
                    code: 500,
                    message: 'Invalid verification code'
                })
            }
            // console.log(verification);
            // verify success - delete record db
            await models.PasswordResetToken.delete({where:condition });
            res.json({
                code: 200,
                message: 'Verification successful'
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