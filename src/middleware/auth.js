require('dotenv').config()
const jwt = require('jsonwebtoken');
const {ErrorType} = require('../helper/enum');
const appError = require("../helper/error.helper");
module.exports = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(process.env.ACCESS_TOKEN_SECRET);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
      console.log(err)
    if (err) {
        // return res.sendStatus(403);
        throw new appError("your token is expire",ErrorType.permission_denied)
    }
        console.log(user_id);
      req.user_id = user_id
      next()
    }) 
}