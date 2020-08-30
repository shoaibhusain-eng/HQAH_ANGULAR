const { database } = require('../../config');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(database.url, database.deprecation);

autoIncrement.initialize(connection);

const OrderSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    subject: { type: String, required: true },
    word_count: { type: String, required: true },
    reference_style: { type: String, required: true },
    file: { type: Array, required: true, deafalt: null },
    due_date: { type: Date, required: true },
    message: { type: String, default: null },
    coupon_code: { type: String, default: null },
    status: { type: String, default: 'pending' },
    assigned_employee: { type: String, default: null },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

OrderSchema.plugin(autoIncrement.plugin, { model: 'order', startAt: 1 });
var order = connection.model('order', OrderSchema, 'order');

module.exports = order;
