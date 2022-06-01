const multer = require('multer');
const multerHelper = require('../helper/multer.helper');
const path = require('path')
let cnt = 0;
const storage = multer.diskStorage({

    destination: (req, file, cb)=> {
        
        cb(null, path.join(__dirname,'../uploads'));
    },

    filename: function(req, file, cb) {
        cnt++
        cb(null, 'Emp'+cnt+"-"+ Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage, fileFilter: multerHelper.imageFilter });

module.exports = upload