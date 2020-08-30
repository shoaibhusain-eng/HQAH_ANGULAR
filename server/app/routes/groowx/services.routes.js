const { servicesController } = require('../../controller');
// const middleware = require('../../../middleware/middleware');

module.exports = (app) => {
    app.post('/services/create', servicesController.create);
    app.get('/services/list', servicesController.list);
}