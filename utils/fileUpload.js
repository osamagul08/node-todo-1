const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img');
    },
    filename: (req, file, callback) => {
        callback(null,  Date.now()+"--"+file.originalname)
    }
})

const upload = multer({ storage: fileStorage})

module.exports = upload