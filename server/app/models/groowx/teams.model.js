const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);

const TeamsSchema = mongoose.Schema({
    title: { type: String, required: true },
    alias: { type: String, required: true },
}, {
    timestamps: false
});

TeamsSchema.plugin(autoIncrement.plugin, { model: 'teams', startAt: 1 });
var teams = connection.model('teams', TeamsSchema, 'teams');

module.exports = teams;
