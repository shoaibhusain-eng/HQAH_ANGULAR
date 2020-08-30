const { RefundSchema } = require('../models');
const { ResponseFormat } = require('../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

module.exports = {
    async create(req, res) {
        const reqBody = req.body;
        const Name = reqBody.name;
        const Email = reqBody.email;
        const phoneCode = reqBody.phone_code;
        const Phone = reqBody.phone;
        const orderCode = reqBody.order_code;
        const Deadline = reqBody.deadline;
        const deliverDate = reqBody.deliver_date;
        const Message = reqBody.message;
        const Files = req.files;

        if (!Name) { return requiredResponse(res, "Name") }
        if (!Email) { return requiredResponse(res, "Email") }
        if (!phoneCode) { return requiredResponse(res, "Phone Code") }
        if (!Phone) { return requiredResponse(res, "Phone") }
        if (!orderCode) { return requiredResponse(res, "Order Code") }
        if (!Deadline) { return requiredResponse(res, "Deadline") }
        if (!deliverDate) { return requiredResponse(res, "Deliver Date") }
        if (!Message) { return requiredResponse(res, "Message") }

        try {
            let assignmentFiles = [];

            if (Files) {
                Files.forEach(E => {
                    assignmentFiles.push(E.filename);
                })
            }

            const refundModel = new RefundSchema({
                name: Name,
                email: Email,
                phone_code: phoneCode,
                phone: Phone,
                order_code: orderCode,
                deadline: Deadline,
                deliver_date: deliverDate,
                message: Message,
                file: assignmentFiles.length ? assignmentFiles : null
            })

            const createRefund = await refundModel.save();
            return successResponse(res, createRefund, 201, "Information saved successfully");
        } catch (err) {
            return errorResponse(res, 500, "something went wrong, when save information");
        }

    }
}