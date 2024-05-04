//----------* REQUIRES *----------//
const jwt = require('jsonwebtoken');
const models = require('../models');
const { Op } = require('sequelize');

const secretAccessToken = process.env.ACCESS_TOKEN_SECRET || 'access-token';

const JWT = {
    authenToken: async(req, res,  next) => {
        try{
            //const authorizationHeader = req.headers['authorization'];

            const authorizationAccessToken = req.session.accessToken;
            const authorizationRefreshToken = req.session.refreshToken;

            if(!authorizationAccessToken){
                res.status(401).send({
                    code: 401,
                    message: "Unauthorization."
                })
            }
            else{
                const acessToken = authorizationAccessToken.split(' ')[1];
                if(!acessToken){
                    res.status(401).send({
                        code: 401,
                        message: "Unauthorization."
                    });
                }else{
                    jwt.verify(acessToken, secretAccessToken, (err, data)=>{
                        // console.log(err, data);
                        if(err){
                            res.status(401).send({
                                code: 401,
                                message: "Unauthorization."
                            })
                        }
                        else{
                            next();
                        }
                    });
                }
            }
            
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }
}

//----------* EXPORTS *----------//
module.exports = JWT;