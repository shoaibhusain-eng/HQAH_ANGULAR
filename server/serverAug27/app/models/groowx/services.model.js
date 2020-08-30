const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);

const ServicesSchema = mongoose.Schema({

    title: { type: String, required: true },
    title_description: { type: String, required: true },
    sub_title: { type: String, required: true },
    sub_title_description: { type: String, required: true },
    parent_id: { type: Number, required: true },

    meta: { type: Array, require: true },
    content: { type: String, required: true },

    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

ServicesSchema.plugin(autoIncrement.plugin, { model: 'services', startAt: 1 });
var services = connection.model('services', ServicesSchema, 'services');

module.exports = services;
