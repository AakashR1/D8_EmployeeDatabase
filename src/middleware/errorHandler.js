const {ErrorType} = require("../helper/enum");
const sendErrorResponse = (err,status,res)=>{
    const errorObj = {error_reason:err.reason, error_message:err.message};
    return res.status(status).send(errorObj);
}

const generateErrorResponse = (err,res) =>{
    switch (err.reason){
        case ErrorType.invalid_request:
      return sendErrorResponse(err, 400, res);
    case ErrorType.not_found:
      return sendErrorResponse(err, 404, res);
    case ErrorType.permission_denied:
      return sendErrorResponse(err, 403, res);
    case ErrorType.unauthorized:
      return sendErrorResponse(err, 401, res);
    case ErrorType.conflict:
      return sendErrorResponse(err, 409, res);
    case ErrorType.validation_error:
      return sendErrorResponse(err, 400, res);
    default:
        return sendErrorResponse(err, 500, res);
    }
}

const errorHandllerMiddleware = (err,req,res,next)=>{
    console.log('-----------error is ',err);
    return  generateErrorResponse(err,res)
}

module.exports = errorHandllerMiddleware