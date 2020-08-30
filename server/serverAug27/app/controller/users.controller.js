const { UserSchema } = require('../models');
const { ResponseFormat, Helper, Constants } = require('../../core');
const { successResponse, errorResponse, requiredResponse } = ResponseFormat;
const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {

    async signup(req, res) {
        const reqBody = req.body;
        const Name = reqBody.name;
        const Email = reqBody.email;
        const PhoneCode = reqBody.phone_code;
        const Phone = reqBody.phone;
        const Address = reqBody.address;
        const Country = reqBody.country;
        const DOB = reqBody.date_of_birth;

        if (!Name) { return requiredResponse(res, "Name") }
        if (!Email) { return requiredResponse(res, "Email") }
        if (!Phone) { return requiredResponse(res, "Phone") }

        const randomPassword = Math.random().toString(36).slice(-8);

        const userModel = new UserSchema({
            name: Name,
            email: Email,
            password: md5(randomPassword),
            phone_code: PhoneCode,
            phone: Phone,
            address: Address,
            country: Country,
            date_of_birth: DOB
        });

        try {
            // check duplicate email
            const userInfo = await module.exports.findUser({ email: Email });
            if (userInfo) { return errorResponse(res, 409, "Email is Already Registerd"); }

            // send email
            const subject = 'Account Created - HQAH website';
            let msg_body = 'Hi ' + Name + ',<br />Your account has been created on';
            msg_body += ' High Quality Assinment Help (HQAH). <br /> Please find below your login credentials:<br />';
            msg_body += ' Email: ' + Email + '<br />Password: ' + randomPassword + '<br /><br />'
            msg_body += ' Thanks,<br />HQAH Team';
            Helper.sendEmail(Email, subject, msg_body);

            // Save User in the database
            const createUser = await userModel.save();
            return successResponse(res, createUser._id, 201, "Registration successfully");
        } catch (err) {
            return errorResponse(res, 500, "something went wrong when create user");
        }
    },

    async login(req, res) {
        const Email = req.body.email;
        const Password = req.body.password;

        if (!Email) { return requiredResponse(res, "Email") }
        if (!Password) { return requiredResponse(res, "Password") }

        try {
            const userInfo = await module.exports.findUser({ email: Email });
            if (!userInfo) { return errorResponse(res, 404, "This email is not registered"); }

            let logedIn = await module.exports.findUser({ email: Email, password: md5(Password) });
            logedIn = logedIn ? logedIn.toJSON() : logedIn;

            if (!logedIn) {
                return errorResponse(res, 404, "Record not found with your current credentials!");
            }

            // Send JWT Token
            const token = jwt.sign(logedIn, Constants.SECRET_TOKEN, { expiresIn: '30m' });
            logedIn.token = token;
            return successResponse(res, logedIn, 200, "Login successfully");

        } catch (err) {
            return errorResponse(res, 500, "something went wrong when login");
        }
    },

    async checkEmailforForgetPassword(req, res) {
        const Email = req.query.email;
        const baseUrl = req.headers['origin'];
        if (!Email) { return requiredResponse(res, "Email") }

        try {
            const minute = 10;
            const userInfo = await module.exports.findUser({ email: Email });
            const token = Date.now() + (minute * 60000);

            if (!userInfo) { return errorResponse(res, 404, "This email is not registered"); }

            let Link = baseUrl + '/change-password?params=' + Helper.encoder(userInfo._id);
            Link += '&token=' + Helper.encoder(token);
            const subject = 'Reset Password - HQAH website';
            let msg_body = 'Hi ' + userInfo.name + ',<br />';
            msg_body += ' Need to reset your HQAH password? Click Below:<br />';
            msg_body += Link;
            msg_body += '<br /><br /> If you think you received this email by mistake, feel free to ignore it.';
            msg_body += ' <br /><br />Thanks,<br />HQAH Team';
            Helper.sendEmail(Email, subject, msg_body);
            return successResponse(res, {}, 200, `Reset password link send to your email`);

        } catch (err) {
            return errorResponse(res, 500, "something went wrong when check email");
        }
    },

    async updatePassword(req, res) {
        const reqBody = req.body;
        const userId = reqBody.userId;
        const Email = reqBody.email;
        const Password = reqBody.password;

        if (!userId && !Email) { return requiredResponse(res, "UserId & Email") }
        if (!Password) { return requiredResponse(res, "Password") }

        const filter = userId ? { _id: userId } : { email: Email };

        try {
            const update = await UserSchema.findOneAndUpdate(filter, { password: md5(Password) });

            if (!update) {
                return errorResponse(res, 404, `Record not found with this ${userId ? "Id" : "Email"}`);
            }

            return successResponse(res, {}, 200, "Password updated successfully");

        } catch (err) {
            return errorResponse(res, 500, "something went wrong when check email");
        }

    },

    async socialLogin(req, res) {
        const reqBody = req.body;
        const Name = reqBody.name;
        const Email = reqBody.email;
        const Image = reqBody.image;
        const Provider = reqBody.provider;

        try {
            const isUser = await module.exports.findUser({ email: Email });

            if (!isUser) {
                const randomPassword = Math.random().toString(36).slice(-8);

                const userModel = new UserSchema({
                    name: Name,
                    email: Email,
                    password: md5(randomPassword),
                    image: Image,
                    provider: Provider
                });

                const subject = 'Account Created - HQAH website';
                let msg_body = 'Hi ' + Name + ',<br />Your account has been created on';
                msg_body += ' High Quality Assinment Help (HQAH). <br /> Please find below your login credentials:<br />';
                msg_body += ' Email: ' + Email + '<br />Password: ' + randomPassword + '<br /><br />'
                msg_body += ' Thanks,<br />HQAH Team';
                // Helper.sendEmail(Email, subject, msg_body);

                const createdUser = await userModel.save();
                const newUser = await module.exports.findUser({ _id: createdUser._id });
                return successResponse(res, newUser, 200, "login successfully");
            }

            return successResponse(res, isUser, 200, "login successfully");

        } catch (err) {
            return errorResponse(res, 500, "somithing went wrong when social login");
        }

    },

    findUser(params) {
        const method = Object.keys(params).length ? 'findOne' : 'find';
        params['is_deleted'] = false;

        return new Promise((resolve, reject) => {
            UserSchema[method](params).select('-__v -updated_at -is_deleted')
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        })
    }
}


// G+ Client ID --> 370939921954-0dqk0jir9gvh5amkjti5lalrg9koej5m.apps.googleusercontent.com
// G+ Client Secret --> m4AL5-N8ThO6ywQcTvB5ss_N

// FB App ID --> 3082390805213032
// FB App Secret --> f19a09e3a954410fbec1998209dac163
