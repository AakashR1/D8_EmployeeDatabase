const {db} = require('../DB/DBconn');
const {ErrorType} = require('../helper/enum');
const appError = require("../helper/error.helper");
const {sendResponse, sendResponseMessage} = require('../helper/response.helper');
const util = require('util');

const querys= util.promisify(db.query).bind(db)
const postSignUp = async (req,res,next)=>{
    try {
        const {first_name, last_name, email_id, password } = req.body
        const Checker = await querys(`SELECT emp_id FROM employee WHERE email_id = "${email_id}"`);
        if(Checker.length <1){
            await querys(`INSERT INTO employee(first_name, last_name, email_id, password)  VALUES ("${first_name}","${last_name}","${email_id}","${password}")`);
            await querys(`
            ALTER TABLE employee
            ADD COLUMN IF NOT EXISTS employeeImage VARCHAR(50) ;
            
            ALTER TABLE employee
            ADD COLUMN IF NOT EXISTS deletedAt DATETIME;
            
            `);
            return sendResponseMessage(200,res,'Employee added successfully');
        }
                
        if(password.length <5){
            // return sendResponseMessage(200,res,'Employee added successfully');
            throw new appError("password should be 6 or more digit",ErrorType.validation_error);
        }
        throw new appError("Employee is already added",ErrorType.conflict);
        // return sendResponseMessage(401,res,"Employee is already added");
        
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const postlogin = async (req,res,next)=>{
    try {
        const {email_id, password } =req.body;
        const Checker = await querys(`SELECT email_id, password FROM employee WHERE email_id = "${email_id}" LIMIT 1`);
        if( Checker.length <1){
            return sendResponseMessage(401,res,"You are not register");
        }
        console.log(Checker[0].email_id,  email_id, Checker[0].password , password);
        if(Checker[0].email_id == email_id && Checker[0].password == password){
            return sendResponseMessage(200,res,"Login success....")
        }
        return sendResponseMessage(401,res,"Email id or password is wrong")
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const DeleteEmployee = async(req,res,next)=>{
    try {
        const {email_id, password } =req.body;
        // const Checker = await querys(`SELECT email_id, password FROM employee WHERE email_id = "${email_id}" LIMIT 1`);
        // if( Checker.length <1){
        //     return sendResponseMessage(401,res,"You are not register");
        // }
        // console.log(Checker[0].email_id,  email_id, Checker[0].password , password);
        // if(Checker[0].email_id == email_id && Checker[0].password == password){
            
            
            const result = await querys(`UPDATE employee SET email_id = NULL, password = NULL, deletedAt = CURRENT_TIMESTAMP  WHERE email_id = "${email_id}" AND password = "${password}"`);
            // const result = await querys(`UPDATE employee SET deletedAt = CURRENT_TIMESTAMP  WHERE email_id = "${email_id}" AND password = "${password}"`);
            if(result.affectedRows == 0){
                console.log(result.affectedRows);
                return sendResponseMessage(401,res,"Email id or password is wrong")
            }
            return sendResponseMessage(204,res,"Employee Deleted succussfully.....");
            // }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const Uploadimage = async(req,res,next)=>{
    try {
        
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        
        const result= await querys(`UPDATE employee SET employeeImage = "${req.file.path}"  WHERE email_id = "${req.body.email_id}" `)               
        if(result.affectedRows <1){
            throw new appError("Employee is not exists",ErrorType.invalid_request);
        }
        sendResponseMessage(201,res,"Image uploaded")
        
    } catch (error) {
        next(error)
    }
}

const uploadFile =
module.exports = {
    postSignUp,
    postlogin,
    DeleteEmployee,
    Uploadimage
}