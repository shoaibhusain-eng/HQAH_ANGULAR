const {  servicePageController  } = require('../../../controller');
// const middleware = require('../../../middleware/middleware');

const { Constants } = require('../../../../core');
var multer = require('multer');

var DIR = Constants.GENERAL_PATH;

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
    app.post('/service-page/create', servicePageController.create);
    app.post('/service-page/list', servicePageController.list);
    app.get('/service-page/deleteService', servicePageController.deleteService);
    app.put('/service-page/updateService', upload.any(), servicePageController.updateService);
    app.get('/service-page/getService', servicePageController.getService);
    app.get('/service-page/serviceTitles', servicePageController.serviceTitles);
}
