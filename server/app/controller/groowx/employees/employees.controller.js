const { EmployeesSchema } = require('../../../models');
const { ResponseFormat, Helper, Constants } = require('../../../../core');
const empSetting = require('./setting.controller');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = {
    async create(req, res) {
        const reqBody = req.body;
        const firstName = reqBody.first_name;
        const lastName = reqBody.last_name;
        const Email = reqBody.email;

        const jobTitle = reqBody.job_title;
        const Team = reqBody.team;
        const Level = reqBody.level;
        const checkIn = reqBody.check_in;
        const checkOut = reqBody.check_out;
        const joiningDate = reqBody.joining_date;
        const reportingTo = reqBody.reporting_to;
        const employeeType = reqBody.employee_type;

        const randomPassword = Math.random().toString(36).slice(-8);

        const employeesModel = new EmployeesSchema({
            first_name: firstName,
            last_name: lastName,
            email: Email,
            password: md5(randomPassword),
            job_title: jobTitle,
            team: Team,
            level: Level,
            check_in: checkIn,
            check_out: checkOut,
            joining_date: joiningDate,
            reporting_to: reportingTo,
            employee_type: employeeType,
        });

        try {
            // check duplicate email
            const userInfo = await empSetting.findEmployee({ email: Email });
            if (userInfo) { return errorResponse(res, 409, "Email is Already Registerd"); }

            // send email
            const subject = 'Account Created - Groowx website';
            let msg_body = 'Hi ' + firstName + ',<br />Your account has been created on';
            msg_body += ' High Quality Assinment Help (HQAH). <br /> Please find below your login credentials:<br />';
            msg_body += ' Email: ' + Email + '<br />Password: ' + randomPassword + '<br /><br />'
            msg_body += ' Thanks,<br />HQAH Team';
            // Helper.sendEmail(Email, subject, msg_body);

            // Save User in the database
            const createUser = await employeesModel.save();
            return successResponse(res, createUser._id, 201, "User create successfully");
        } catch (err) {
            console.log(err.message, err)
            return errorResponse(res, 500, (err.message || "something went wrong when create user"));
        }
    },

    async login(req, res) {
        const Email = req.body.email;
        const Password = req.body.password;

        if (!Email) { return requiredResponse(res, "Email"); }
        if (!Password) { return requiredResponse(res, "Password"); }

        try {
            const userInfo = await empSetting.findEmployee({ email: Email });

            if (!userInfo) { return errorResponse(res, 404, "This email is not registered"); }

            let logedIn = await empSetting.findEmployee({ email: Email, password: md5(Password) });
            logedIn = logedIn ? logedIn.toJSON() : logedIn;

            if (!logedIn) {
                return errorResponse(res, 404, "Record not found with your current credentials!");
            }

            if (logedIn.status === 'suspended') {
                return errorResponse(res, 404, "Your account temporary suspended, please contact to Admin");
            }

            // Send JWT Token
            const token = jwt.sign(logedIn, Constants.SECRET_TOKEN, { expiresIn: '30m' });
            logedIn.token = token;
            return successResponse(res, logedIn, 200, "Login successfully");

        } catch (err) {
            return errorResponse(res, 500, "something went wrong when login");
        }
    },

    async list(req, res) {
        try {
            const reqBody = req.body;
            const currentPage = reqBody.currentPage ? Number(reqBody.currentPage) : 0;
            const Limit = reqBody.limit ? Number(reqBody.limit) : 5;
            const sortColumn = reqBody.sortColumn ? reqBody.sortColumn : '_id';
            const sortBy = reqBody.sortBy ? reqBody.sortBy : 'asc';

            const filterData = [{}];
            const searchData = [{}];

            const filterColumn = reqBody.filterColumn ? reqBody.filterColumn : '';
            const filter = reqBody.filter ? reqBody.filter : '';

            const search = { $regex: '.*' + filter + '.*', $options: 'i' };

            if (filterColumn && filterColumn !== '_id' && filter)
                filterData.push({ [filterColumn]: search })

            if (filterColumn === '_id' && filter && !isNaN(filter))
                filterData.push({ [filterColumn]: filter })

            if (!filterColumn && filter) {
                searchData.push({ first_name: search });
                searchData.push({ last_name: search });
                searchData.push({ status: search });
                searchData.push({ job_title: search });

                if (!isNaN(filter)) {
                    searchData.push({ _id: filter });
                    searchData.push({ team: filter });
                    searchData.push({ level: filter });
                }
            }

            const skipRecord = currentPage * Limit;

            console.log(reqBody, filterData, searchData)

            let filtered = {};
            if (filterColumn && filter) {
                filtered = { $and: filterData }
            } else if (filter) {
                filtered = { $and: searchData }
            }

            const recordList = await EmployeesSchema
                .find(filtered)
                .populate('team', 'title')
                .skip(skipRecord)
                .limit(Limit)
                .sort({ [sortColumn]: sortBy })
                .lean().exec();

            const totalRecords = await EmployeesSchema
                .find(filtered)
                .count()
                .lean().exec();

            const records = {
                totalRecords: totalRecords,
                currentPage: currentPage,
                Limit: Limit,
                users: recordList,
            };

            return successResponse(res, records, 200, "Users list get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get list"));
        }

    },

    async getEmployee(req, res) {
        const Id = req.query.id;

        if (!Id) { return errorResponse(res, 400, "Id is required"); }

        try {
            const result = await EmployeesSchema.findById(Id).lean().exec();

            if (!result) { return errorResponse(res, 400, "record not found for this user"); }

            return successResponse(res, result, 200, "User get successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when get user"));
        }
    },

    async updateEmployee(req, res) {
        const Id = req.body.id;
        const updatedJson = req.body;

        try {
            const updated = await EmployeesSchema.findByIdAndUpdate(Id, updatedJson).lean().exec();
            return successResponse(res, {}, 200, "User updated successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when updated user"));
        }
    },


    // async AddDocument(req, res) {
    //     const Id = req.body.id;
    //     // const updatedJson = req.body;

    //     try {

    //         console.log("Hellooooooooooo");
    //         // const updated = await EmployeesSchema.findByIdAndUpdate(Id).lean().exec();
    //         return successResponse(res, {}, 200, "Upload AddDocument successfully");
    //     } catch (err) {
    //         return errorResponse(res, 500, (err.message || "something went wrong when Add Document"));
    //     }
    // },

    async deleteUser(req, res) {
        const id = req.query.id;

        try {
            const deleted = await EmployeesSchema.remove({ _id: id }).lean().exec();
            return successResponse(res, {}, 200, "User deleted successfully");
        } catch (err) {
            return errorResponse(res, 500, (err.message || "something went wrong when delete user"));
        }
    }
}
