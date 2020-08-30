module.exports = (app) => {
    require('./users.routes')(app);
    require('./order.routes')(app);
    require('./contact.routes')(app);
    require('./refund-policy.routes')(app);

    // for groowx
    require('./groowx/employees.routes')(app);
    require('./groowx/services.routes')(app);
    require('./groowx/services-page/service-page.routes')(app);
    require('./groowx/setting/template.route')(app);
}