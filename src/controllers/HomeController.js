// REQUIRES //
const models = require('../models');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// HOME CONTROLLER //
const homeController = {
    index: async (req, res) => {
        //Lấy danh sách thành phố //
        const states = await models.State.findAll({
            attributes: ['image', 'name', 'jobs'],
            logging: false,
        })

        // Lấy sô liệu trang web (home) //
        const data = await models.Data.findByPk(1, {
            logging: false,
            //attributes: ['register_member', 'job_found', 'best_companies']
        })

        // Lấy document type offer//
        const offers = await models.Document.findAll({
            attributes: ['title', 'description'],
            where: {
                type: {
                    [Op.eq]: 'offer'
                }
            },
            logging: false,
        },  
        )

        // Lấy danh sách job mới nhất //
        const jobs = await models.Job.findAll({
            logging: false,
            //attributes: ['expired_at']
            include: ['candidate', 'bookmark'], 
            offset: 1,
            limit: 3,
            order: [
                ['created_at', 'DESC']
            ]
        });

        // Lấy danh sách category ///
        const categories = await models.Category.findAll({
            limit: 12,
            attributes: ['name', 'jobs', 'image'],
            logging: false,
        });

        // Lấy document post job //
        const documents = await models.Document.findAll({
            attributes: ['type','title', 'description'],
            where: {
                type: {
                    [Op.or]:['post job', 'talented candidates', 'introduce']
                    
                }
            },
            limit: 1000,
            logging: false,
        });

        //console.log(documents)


        // render // 
        res.render('index', { 
            states,
            data,
            offers,
            jobs,
            categories,
            documents
        });
    },

    login: async (req, res) => {
        try{
            // Authentication kiểm tra đăng nhập 
            const usersFind = await models.Candidate.findAll({
                where:{ 
                    email: {
                        [Op.eq]: req.body.email
                    }
                },
                logging: false,
            })
            
            const userExist = usersFind.find(user => user.type == 'candidate');
            // nếu tìm thấy user
            if(usersFind.length != 0){
                //nếu mật khẩu không khớp thì đăng nhập lại
                if(!bcrypt.compareSync(req.body.password, userExist.password)){
                    // res.redirect('/login', {error: "Tài khoản hoặc mật khẩu không đúng."})
                    res.json({
                        status: "invalid email and password"
                    })
                }else{
                    const data = { email :req.body.email};
                    const accessToken = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
                    const refreshToken = await jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
                    // Tìm kiếm trong bảng refresh_token với token là acccesToken
                    const refreshTokenFind = await models.RefreshToken.findAll({
                        where:{
                        token: {
                            [Op.eq]: refreshToken
                        }
                        },
                        logging: false,
                    });
                
                    //nếu mã refresh token đã tồn tại thì đăng nhập lại
                    if(refreshTokenFind.length != 0){
                        // res.redirect('/login');
                        res.json({
                            status: "refresh token already exist",
                        })
                    }else{ //nếu chưa có thì thêm vào csdl
                        await models.RefreshToken.create({
                            token: refreshToken,
                        }, {
                            logging: false
                        })

                        //set session accecsss token
                        req.session.accessToken = `Bearer+ ${accessToken}`;

                        //set session refresh token
                        req.session.refreshToken = `Bearer ${refreshToken}`;

                        res.json({
                            accessToken,
                            refreshToken
                        })

                        //res.redirect('/');
                    }
                }
            }else{ // nếu không tìm thấy user thì đăng nhập lại
                // res.redirect('/login', {error: "Tài khoản hoặc mật khẩu không đúng."})
            }
        }catch(err){
          console.log(`ERROR: ${err}`);
        }
    },

    refreshToken: async(req, res) => {

        const refreshToken = req.session.refreshToken;

        //nếu chưa có refresh token trong session
        if(!refreshToken || !refreshToken.split(' ')[1]){
            res.json({
                status: "not login",
            });
        }else{ //nếu đã có refreshToken thì kiểm tra xem token có hợp lệ hay không
            const refreshTokenList = await models.RefreshToken.findAll({
                where:{
                    token: {
                        [Op.eq]: refreshToken.split(' ')[1]
                    }
                }, 
                logging: false,
            })

            //nếu tìm thấy bản ghi có token là refreshToken
            if(refreshTokenList.length != 0){
                jwt.verify(refreshToken.split(' ')[1], process.env.REFRESH_TOKEN_SECRET, async (err, data)=>{
                    // console.log(err, data);
                    if(err){
                        // console.log(err);
                        res.json({
                            status: "refresh token invalid. Please login"
                        });
                    }else{
                        // tạo mới Access Token
                        const accessToken =  await jwt.sign({email: data.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

                        //req.session.destroy();
                        //set session cho Access token mới
                        req.session.accessToken = `Bearer ${accessToken}`;
                        req.session.refreshToken = refreshToken;
                        
                        res.json({
                            accessToken,
                            refreshToken: refreshToken.split(' ')[1]
                        })
                    }
                })   
            }
            else{ // nếu không có bản ghi nào có mã token refreshToken
                res.json({
                    status: "refresh token invalid. Please login"
                })
            }
        }
    },

    logout: async (req, res) =>{
        // lấy refreshToken
        //const authorizationHeader = req.headers['authorization'];
        try{
            const authorization = req.session.refreshToken;
            // nếu chưa có refresh token 
            if(!authorization){
                res.json({
                    status: "not login",
                });
            }else{
                const refreshToken = authorization.split(' ')[1];
                if(!refreshToken){
                    res.json({
                        status: "not login",
                    });
                }else{
                    // kiểm tra refresh token có tôgn tại hay không
                    const resultFind  = await models.RefreshToken.findAll({
                        where:{
                            token:{
                                [Op.eq]: refreshToken
                            },
                        },
                        logging: false,
                    });

                    //nếu tìm thấy thì xóa refreshToken khỏi CSDL
                    if(resultFind.length!=0){
                        await models.RefreshToken.destroy({
                            where:{
                                token:{
                                    [Op.eq]: refreshToken
                                },
                            },
                            logging: false,
                        });
                        
                        req.session.refreshToken = req.session.accessToken = "";
                        //quay lại trang đăng nhập
                        //res.redirect('/login');

                        res.json({
                            status: "logout successfully, please login."
                        })
                    }
                    else{ // nếu không tìm thấy
                        res.json({
                            status: "invalid refreshToken, please login",
                        })
                    }
                }
            }

        }catch(err){
            console.log(`ERROR: ${errr}`);
        }
        
    }
}
// EXPORTS //
module.exports = homeController;