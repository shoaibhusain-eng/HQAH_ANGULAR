const { database } = require('../../config');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(database.url, database.deprecation);

autoIncrement.initialize(connection);

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    address: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
    phone_code: { type: String, required: false, default: null },
    date_of_birth: { type: Date, required: false, default: null },
    provider: { type: String, required: false, default: null },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

UsersSchema.plugin(autoIncrement.plugin, { model: 'users', startAt: 1 });
var users = connection.model('users', UsersSchema, 'users');

module.exports = users;
