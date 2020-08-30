const { employeesController } = require('../../controller');
// const middleware = require('../../../middleware/middleware');

module.exports = (app) => {
    app.post('/employees/create', employeesController.create);
    app.post('/employees/login', employeesController.login);
    app.post('/employees/list', employeesController.list);
    app.get('/employees/deleteUser', employeesController.deleteUser);
    app.post('/employees/updateEmployee', employeesController.updateEmployee);
    app.get('/employees/getEmployee', employeesController.getEmployee);
    // app.put('/employees/uploadDocument', employeesController.UploadDocument);
}
