module.exports = function (req,res,next){
    res.setHeader("X-New-Policy", "Success");
    res.setHeader("X-Powered-By", "none");
    next();
}