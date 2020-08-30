const usersController = require('./users.controller');
const orderController = require('./order.controller');
const refundController = require('./refund-policy.controller');
const contactController = require('./contact.controller');

// for groowx
const employeesController = require('./groowx/employees/employees.controller');
const servicesController = require('./groowx/services/services.controller');
const servicePageController = require('./groowx/services-page/service-page.controller');
const templateController = require('./groowx/setting/template.controller');

module.exports = {
    usersController,
    orderController,
    refundController,
    contactController,

    // for groowx
    employeesController,
    servicesController,
    servicePageController,
    templateController
}