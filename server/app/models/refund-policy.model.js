const { database } = require('../../config');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(database.url, database.deprecation);

autoIncrement.initialize(connection);

const RefundSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    phone_code: { type: String, required: false, default: null },
    order_code: { type: String, required: false, default: null },
    deadline: { type: Date, required: false, default: null },
    deliver_date: { type: Date, required: false, default: null },
    message: { type: String, required: false, default: null },
    file: { type: Array, required: false, default: null },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

RefundSchema.plugin(autoIncrement.plugin, { model: 'refund', startAt: 1 });
var refund = connection.model('refund', RefundSchema, 'refund');

module.exports = refund;
