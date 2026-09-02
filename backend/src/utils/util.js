const jwt=require('jsonwebtoken')
require('dotenv').config();
async function JwtSign(user,option){
    try {
        return await jwt.sign(user,process.env.JWT_SECRET,option)
    } catch (error) {
        console.log(error.message)
    }
}
async function JwtVerify(token){
    try {
        return await jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        console.log(error.message)
    }
}
module.exports={JwtSign,JwtVerify}