const jwt = require('jsonwebtoken')
const User = require('../model/User')

const authentticate = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            res.status(400).send({message:"token is required"})
        }

        const decode = jwt.verify(token,"abhishekgwala2005")
        console.log(decode);

        const find_user = await User.findOne({_id:decode.id})
        if(!find_user){
            res.status(401).send({message:"user not found"})
        }
        
        req.user = find_user
        next()
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = authentticate