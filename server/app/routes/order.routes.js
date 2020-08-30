const { orderController } = require('../controller');

const { Constants } = require('../../core');
var multer = require('multer');

var DIR = Constants.ASSIGNMENT_PATH;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        const fileName = Date.now() + '' + Math.round(Math.round(Math.random() * 5000))+'.' + extension;
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/order/create', upload.any(), orderController.create);
    app.post('/order/list', orderController.list);
}
