const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);
const EmployeeSchema = require('./employees.model')

const TemplateSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    html_content: { type: String, required: true },
    html_content2: { type: String, required: false, default: null },
    html_content3: { type: String, required: false, default: null },
    created_by: { type: Number, required: true, ref: EmployeeSchema },
    status: { type: String, default: 'Active' },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

TemplateSchema.plugin(autoIncrement.plugin, { model: 'templates', startAt: 1 });
var templates = connection.model('templates', TemplateSchema, 'templates');

module.exports = templates;
