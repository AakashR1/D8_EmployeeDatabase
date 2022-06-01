require('dotenv').config();
const express = require('express');
const {ErrorType} = require('./helper/enum')
const app = express();

const createDefaultTables = require('./helper/createTables');
const responseHandler = require('./middleware/responseHandler');
const errorHandler = require('./middleware/errorHandler');
const appError = require('./helper/error.helper');
const employeeRouter = require('./router/employeeRouter');
const path = require('path')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(responseHandler);

app.get('/test',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/form.html"))
})
app.use('/',employeeRouter);

app.use('*',(req,res,next)=>{
try {
    console.log('here');
    throw new appError("Page Not found",ErrorType.not_found);
} catch (error) {
    next(error)
}
})

app.use(errorHandler);

PORT = process.env.PORT;
app.listen(PORT,async()=>{
    await createDefaultTables();
    console.log(`Server is running on port ${PORT}`);
})





