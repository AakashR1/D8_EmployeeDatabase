const express = require('express');
const routes = express.Router();
const employeecontoller = require('../controller/employeeController');
const upload = require('../middleware/multerStorage');

routes.post('/signup',employeecontoller.postSignUp);
routes.post('/login',employeecontoller.postlogin);
routes.delete('/delete',employeecontoller.DeleteEmployee);
routes.post('/UploadImage',upload.single('Image'),employeecontoller.Uploadimage);

module.exports = routes;