const { database } = require('../../../config');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const TeamsSchema = require('./teams.model');
const connection = mongoose.createConnection(database.url, database.deprecation);
autoIncrement.initialize(connection);

// const DocumentSchema = new Schema({
//     file_name: { type: String },
//     file_desc: { type: String },
//     file_type: { type: String },
//     // action_type: { type: String, required: true },
//     //   userid: { type: Number, required: true },
//     is_deleted: { type: Boolean, required: true, default: false },
//     createdAt: { type: Date, required: true, default: Date.now }
// },
//     {
//         timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
//     })


const PersonalInfoSchema = mongoose.Schema({
    date_of_birth: { type: Date, required: false, default: null },
    marital_status: { type: String, required: false, default: null },
    gender: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    address1: { type: String, required: false, default: null },
    address2: { type: String, required: false, default: null },
    city: { type: String, required: false, default: null },
    state: { type: String, required: false, default: null },
    postal_code: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
}, {
    timestamps: false
});

const EmergencyContactSchema = mongoose.Schema({
    first_name: { type: String, required: false, default: null },
    last_name: { type: String, required: false, default: null },
    relationship: { type: String, required: false, default: null },
    contact: { type: String, required: false, default: null }
}, {
    timestamps: false
});

const EmployeesSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    job_title: { type: String, required: true },
    team: { type: Number, required: true, ref: TeamsSchema },
    level: { type: Number, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    joining_date: { type: String, required: true },
    reporting_to: { type: Number, required: true },
    employee_type: { type: String, required: true },

    image: { type: String, required: false, default: null },
    status: { type: String, default: "active" },

    personal_info: PersonalInfoSchema,
    emergency_contact: EmergencyContactSchema,
    // files: [DocumentSchema],

    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

EmployeesSchema.plugin(autoIncrement.plugin, { model: 'employees', startAt: 1 });
var employees = connection.model('employees', EmployeesSchema, 'employees');

module.exports = employees;
