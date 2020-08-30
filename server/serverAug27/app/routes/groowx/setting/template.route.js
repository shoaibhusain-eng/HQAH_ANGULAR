const { templateController } = require('../../../controller');

module.exports = (app) => {
    app.post('/template/create', templateController.create);
    app.post('/template/list', templateController.list);
    app.put('/template/update', templateController.update);
    app.get('/template/getOne', templateController.getOne);
    app.get('/template/delete', templateController.delete);
}
