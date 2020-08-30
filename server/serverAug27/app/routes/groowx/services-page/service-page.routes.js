const {  servicePageController  } = require('../../../controller');
// const middleware = require('../../../middleware/middleware');

module.exports = (app) => {
    app.post('/service-page/create', servicePageController.create);
    app.post('/service-page/list', servicePageController.list);
    app.get('/service-page/deleteService', servicePageController.deleteService);
    app.put('/service-page/updateService', servicePageController.updateService);
    app.get('/service-page/getService', servicePageController.getService);
    app.get('/service-page/serviceTitles', servicePageController.serviceTitles);
}
