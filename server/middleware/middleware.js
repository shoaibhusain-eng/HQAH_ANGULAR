var jwt = require('jsonwebtoken');
const { Constants, ResponseFormat } = require('../core');
// const jwt_token_age = 30 * 60; // for 30 minutes
const jwt_token_age = 6; // for 30 minutes

module.exports = function (req, res, next) {
    console.log(next)
}