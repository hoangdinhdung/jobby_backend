// requires 
const models = require('../../models');
const bcrypt = require('bcryptjs');


const testController = {
    test: async (req, res) =>{
        try{
            const fields =[
                'id',
                'name',
                'password'
            ]
            const users = await models.User.getAllUser(fields)
            const user = users && users[0] || null;
            if(user){
                let match = await bcrypt.compareSync('password1', user.password)
                console.log(`match`, match);
            }
            return res.json({
                code:200, 
                message: 'api ok!',
                users
            });
        }catch(error){
            console.log(`ERROR: ${error}`);
        }
    },
}

module.exports = testController;