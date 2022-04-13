// REQUIRES
const models = require('../../models');
const bcrypt = require('bcryptjs');

// CANDIDATE CONTROLLER
const candidateController = {
    // Lấy danh sách ứng viên dựa vào page params
    candidateWithPageLimit: async (req, res) => {
        try{
            //console.log(req.query.page);
            const candidateList = await models.Candidate.findAll({
                limit: 6,
                offset: 6 * (req.query.page - 1),
                logging: false
            })

            res.json({
                candidateList: candidateList
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }, 

    //Tạo mới ứng viên (đăng ký)
    createCandiate: async (req, res) => {
        try{
            //console.log(req.body.email);
            
            const passwordHashed = bcrypt.hashSync(req.body.password, 5);
            //console.log(passwordHashed);
            await models.Candidate.create({
                image: "unavailable.png",
                first_name: "",
                last_name: "",
                email: req.body.email,
                password: passwordHashed,
                description: "",
                tagline: "",
                skills: "",
                availability: "",
                experience_level: "",
                pay_rate: 0,
                languages: "",
                location: "",
                company_site: "",
                blog_site: "",
                portfolio_site: "",
                rating: 0.0,
                facebook: "",
                twitter: "",
                google: "",
                youtube: "",
                linkedin: "",
                instagram: "",
                dribbble: "",
                behance: "",
                github: ""
            }, {
                logging: false
            });

            res.redirect('/candidate');
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
        
    },

    // Danh sách tất cả ứng viên
    candidateFullList: async (req, res) => {
        try{
            const allCandidate = await models.Candidate.findAll({
                logging: false,
                include: ['apply']
            });

            res.json({
                allCandidate: allCandidate
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    },

    // Hiển thị ứng cử viên nổi bật
    featuredCandidates: async (req, res) => {
        try{
            featuredCandidates = await models.Candidate.findAll({
                order: [
                    ['rating', 'desc']
                ],
                limit: 6,
                logging: false
            });


            res.json({
                featuredCandidates: featuredCandidates
            })
        }catch(err){
            console.log(`ERROR: ${err}`);
        }
    }
};

// EXPORTS
module.exports = candidateController;