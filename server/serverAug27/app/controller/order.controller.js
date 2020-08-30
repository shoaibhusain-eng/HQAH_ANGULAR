const { UserSchema, OrderSchema } = require('../models');
const { usersController } = require('../controller');
const { ResponseFormat } = require('../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;
const md5 = require('md5');

module.exports = {
    async create(req, res) {
        const reqBody = req.body;

        // user information
        const Name = reqBody.name;
        const Email = reqBody.email;
        const phoneCode = reqBody.phone_code;
        const Phone = reqBody.phone;
        const Country = reqBody.country;

        // order information
        const Subject = reqBody.subject;
        const wordCount = reqBody.word_count;
        const referenceStyle = reqBody.reference_style;
        const Message = reqBody.message;
        const dueDate = reqBody.due_date;
        const assignmentArray = req.files;

        if (!Name) { return requiredResponse(res, "Name"); }
        if (!Email) { return requiredResponse(res, "Email"); }
        if (!phoneCode) { return requiredResponse(res, "Phone Code"); }
        if (!Phone) { return requiredResponse(res, "Phone"); }
        if (!Country) { return requiredResponse(res, "Country"); }

        if (!Subject) { return requiredResponse(res, "Subject"); }
        if (!wordCount) { return requiredResponse(res, "Word Count"); }
        if (!referenceStyle) { return requiredResponse(res, "Reference Style"); }
        if (!Message) { return requiredResponse(res, "Message"); }
        if (!dueDate) { return requiredResponse(res, "Due Date"); }

        try {

            const userInfo = await usersController.findUser({ email: Email });
            let userId = userInfo ? userInfo._id : 0;

            if (!userInfo) {
                const randomPassword = Math.random().toString(36).slice(-8);

                const userModel = new UserSchema({
                    name: Name,
                    email: Email,
                    password: md5(randomPassword),
                    phone_code: phoneCode,
                    phone: Phone,
                    country: Country
                });

                // Save User in the database
                const createUser = await userModel.save();
                userId = createUser._id;

                // send email
                const subject = 'Account Created - HQAH website';
                let msg_body = 'Hi ' + Name + ',<br />Your account has been created on';
                msg_body += ' High Quality Assinment Help (HQAH). <br /> Please find below your login credentials:<br />';
                msg_body += ' Email: ' + Email + '<br />Password: ' + randomPassword + '<br /><br />'
                msg_body += ' Thanks,<br />HQAH Team';
                // await Helper.sendEmail(Email, subject, msg_body);
            }

            let assignmentFiles = [];

            if (assignmentArray) {
                assignmentArray.forEach(E => {
                    assignmentFiles.push(E.filename);
                })
            }

            const orderModel = new OrderSchema({
                user_id: userId,
                subject: Subject,
                word_count: wordCount,
                reference_style: referenceStyle,
                due_date: dueDate,
                message: Message,
                file: assignmentFiles.length ? assignmentFiles : null
            });

            const createOrder = await orderModel.save();

            return successResponse(res, {}, 201, "Order place successfully");

        } catch (err) {
            return errorResponse(res, 500, "something went wrong when place order");
        }

    },

    async findAll(req, res) {
        try {
            const orders = await OrderSchema.find().select("-__v -updated_at").lean().exec();
            return successResponse(res, orders, 200, "Order list get successfully")
        } catch (err) {
            return errorResponse(res, 500, "something went wrong when get order list");
        }

    }
}