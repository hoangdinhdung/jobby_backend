//----------* REQUIRES *----------//
const jwt = require('jsonwebtoken');
const models = require('../models');
const { Op } = require('sequelize');

const JWT = {
    authenToken: async(req, res,  next) => {
        try{
            //const authorizationHeader = req.headers['authorization'];

            const authorizationAccessToken = req.session.accessToken;
            const authorizationRefreshToken = req.session.refreshToken;

            if(!authorizationRefreshToken || !authorizationAccessToken){
                res.json({
                    status: "not login"
                })
            }
            else{
                const refreshToken = authorizationRefreshToken.split(' ')[1];
                if(refreshToken){
                    // kiểm tra refreshToken có tồn tại trong CSDL hay không?
                    const resultFind  = await models.RefreshToken.findAll({
                        where:{
                            token:{
                                [Op.eq]: refreshToken
                            },
                        },
                        logging: false,
                    });
                    //nếu tìm thấy refreshToken
                    if (resultFind.length != 0){
                        const acessToken = authorizationAccessToken.split(' ')[1];
                        if(!acessToken){
                            res.sendStatus(402);
                        }else{
                            jwt.verify(acessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
                                // console.log(err, data);
                                if(err){
                                    res.json({
                                        status: "expired access token, please refresh the access token",
                                    });
                                }
                                else{
                                    next();
                                }
                            });
                        }
                    }else{
                        res.json({
                            status: "invalid refresh token. please login",
                        });
                    }
                }else{
                    res.json({
                        status: "invalid refresh token, please login",
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