const UserSchema = require('./users.model');
const OrderSchema = require('./order.model');
const ContactSchema = require('./contact.model');
const RefundSchema = require('./refund-policy.model');

// for groowx
const EmployeesSchema = require('./groowx/employees.model');
const ServicesSchema = require('./groowx/services.model');
const TeamsSchema = require('./groowx/teams.model');
const ServicePageSchema = require('./groowx/servicePage.model');
const TemplateSchema = require('./groowx/template.model');

module.exports = {
    UserSchema,
    OrderSchema,
    ContactSchema,
    RefundSchema,

    // for groowx
    EmployeesSchema,
    ServicesSchema,
    TeamsSchema,
    ServicePageSchema,
    TemplateSchema
}
