require('dotenv').config();
const jwt = require('jsonwebtoken');
const signJWT= (ValueForJWT)=>{
    const accessToken =  jwt.sign(ValueForJWT, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}

module.exports = signJWT