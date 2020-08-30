const jj = [
    {
        level: 3,
        module: 'Table Columns',
        permissions: ['1', '2', '3', '4' ]
    }
]

const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);

const PermissionsSchema = mongoose.Schema({
    module: { type: String, required: true },
    permissions: { type: Array, required: true }
}, {
    timestamps: false
});

PermissionsSchema.plugin(autoIncrement.plugin, { model: 'permissions', startAt: 1 });
var permissions = connection.model('permissions', PermissionsSchema, 'permissions');

module.exports = permissions;
