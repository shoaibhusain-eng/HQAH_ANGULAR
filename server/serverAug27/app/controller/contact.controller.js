const { ContactSchema } = require('../models');
const { usersController } = require('../controller');
const { ResponseFormat } = require('../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;

module.exports = {
    async create(req, res) {
        const reqBody = req.body;
        const Name = reqBody.name;
        const Email = reqBody.email;
        const phoneCode = reqBody.phone_code;
        const Phone = reqBody.phone;
        const Country = reqBody.country;
        const Message = reqBody.message;
        const Files = req.files;

        if (!Name) { return requiredResponse(res, "Name") }
        if (!Email) { return requiredResponse(res, "Email") }
        if (!phoneCode) { return requiredResponse(res, "Phone Code") }
        if (!Phone) { return requiredResponse(res, "Phone") }
        if (!Country) { return requiredResponse(res, "Country") }
        if (!Message) { return requiredResponse(res, "Message") }

        try {
            let assignmentFiles = [];

            if (Files) {
                Files.forEach(E => {
                    assignmentFiles.push(E.filename);
                })
            }

            const contactModel = new ContactSchema({
                name: Name,
                email: Email,
                phone_code: phoneCode,
                phone: Phone,
                country: Country,
                message: Message,
                file: assignmentFiles.length ? assignmentFiles : null
            })

            const createContact = await contactModel.save();
            return successResponse(res, createContact, 201, "Your information has been saved, We will be in contact with you shortly");
        } catch (err) {
            return errorResponse(res, 500, "something went wrong, when save information");
        }

    }
}