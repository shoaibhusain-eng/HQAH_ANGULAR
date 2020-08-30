const { contactController } = require('../controller');

const { Constants } = require('../../core');
var multer = require('multer');

var DIR = Constants.CONTACT_PATH;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        const fileName = Date.now() + '' + Math.round(Math.round(Math.random() * 5000))+'.' + extension;
        cb(null, fileName)
    }
});

var upload = multer({ storage: storage })

module.exports = (app) => {
    app.post('/contact/create', upload.any(), contactController.create);
}