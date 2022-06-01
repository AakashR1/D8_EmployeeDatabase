let {db} = require('../DB/DBconn');
const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const appError = require('../helper/error.helper');

const queryFilePath = path.join(__dirname,'../sql/createTable.sql');
const query = util.promisify(db.query).bind(db)    
const createDefaultTables = async()=>{
    try {
        
        const sqlQuery  = await fs.readFile(queryFilePath,'utf-8',(error,result)=>{
            if(error) throw appError("this is not ","this is also not")
            return result
        })
       await db.query(String(sqlQuery));
       console.log('Default tables are created succesfully');
    } catch (error) {
        console.log(error);   
        console.log('Default tables are not created');
    }
}

module.exports = createDefaultTables;


