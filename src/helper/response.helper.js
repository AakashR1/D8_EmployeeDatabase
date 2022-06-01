const sendResponse = (responseCode,response, data) => {
    return response.status(responseCode).json({data:data});
}

const sendResponseMessage = (responseCode,response, message)=>{
    return response.status(responseCode).json({message:message});
}

module.exports = {
    sendResponse,
    sendResponseMessage
}