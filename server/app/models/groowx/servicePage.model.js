const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const EmployeesSchema = require('./employees.model');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);



const ServicePageSchema = mongoose.Schema({
    title: { type: String, required: true },
    title_desc: { type: String, required: true },
    sub_title: { type: String, required: true },
    sub_desc: { type: String, required: true },

    meta_data_title: { type: String, required: true },
    meta_data_desc: {  type: String, required: true},
    html: { type: String, required: true },
    html2: { type: String, required: false, default: null },
    html3: { type: String, required: false, default: null },

    banner_image: { type: Array, required: false, default: null },
    banner_image_meta_title: { type: String, required: false, default: null },
    banner_image_meta_desc: { type: String, required: false, default: null },

    level: {  type: String, required: true},
    parent_id: {  type: String, required: true},
    created_by: {  type: Number, required: true, ref: EmployeesSchema},
 
    status: { type: String, default: "Private" },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

ServicePageSchema.plugin(autoIncrement.plugin, { model: 'servicePage', startAt: 1 });
var servicePage = connection.model('servicePage', ServicePageSchema, 'servicePage');

module.exports = servicePage;
