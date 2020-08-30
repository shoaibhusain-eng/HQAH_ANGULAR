const { database } = require('../../config');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(database.url, database.deprecation);

autoIncrement.initialize(connection);

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    phone_code: { type: String, default: null },
    country: { type: String, default: null },
    message: { type: String, default: null },
    file: { type: Array, default: null },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

ContactSchema.plugin(autoIncrement.plugin, { model: 'contact', startAt: 1 });
var contact = connection.model('contact', ContactSchema, 'contact');

module.exports = contact;
