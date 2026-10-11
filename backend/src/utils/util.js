const jwt=require('jsonwebtoken')
const crypto=require('crypto')
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

function generateSecureToken() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  // Helper function to pick a cryptographically secure random character from a string
  function getSecureChar(allowedChars) {
    // crypto.randomInt guarantees uniform distribution up to the max index (exclusive)
    const randomIndex = crypto.randomInt(0, allowedChars.length);
    return allowedChars[randomIndex];
  }

  // Construct the segments based on the pattern: L D - D D - D D
  const part1 = getSecureChar(letters) + getSecureChar(digits);
  const part2 = getSecureChar(digits) + getSecureChar(digits);
  const part3 = getSecureChar(digits) + getSecureChar(digits);

  return `${part1}-${part2}-${part3}`;
}

module.exports={JwtSign,JwtVerify,generateSecureToken}